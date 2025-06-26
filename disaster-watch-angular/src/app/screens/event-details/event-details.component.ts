import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FloodEvent, UserLocation } from '../../shared/model/floodEventWithUserLocation';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventMapComponent } from '../../components/event-map/event-map.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-event-details',
  imports: [ToastModule, CommonModule, EventMapComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);
  private messageService = inject(MessageService);

  private readonly now: Date = new Date();
  daysSinceEvent = signal<number>(0);
  hoursSinceEvent = signal<number>(0);
  isEventStillOccuring = false;

  readonly userLocation = toSignal<UserLocation | undefined>(this.searchService.userLocationSubject);
  readonly floodEvents = toSignal<FloodEvent[] | undefined>(this.searchService.floodWarningsSubject);
  private readonly paramMapSignal = toSignal(this.route.paramMap);
  readonly floodEvent = signal<FloodEvent | undefined>(undefined);

  readonly id = computed(() => {
    const idParam = this.paramMapSignal()?.get('id');
    return idParam && !isNaN(+idParam) ? +idParam : null;
  });

  constructor() {
    effect(() => {
      const id = this.id();
      const floodEvents = this.floodEvents();

      if (id === null) {
        this.router.navigate(['/']);
        return;
      }

      if (floodEvents) {
        const found = floodEvents.find(event => event.id === id);
        if (found) {
          this.loadEventByPreviousSearchData(found);
        } else {
          this.loadEventById(id);
        }
      } else {
        this.loadEventById(id);
      }

    });
  }

  private loadEventByPreviousSearchData(foundEvent: FloodEvent) {
    this.floodEvent.set(foundEvent);
    this.calculateTimeSinceEvent(foundEvent);
  }

  private loadEventById(id: number) {
    this.searchService.getFloodEventByID(id).subscribe({
      next: (data) => {
        this.floodEvent.set(data);
        this.calculateTimeSinceEvent(data);
      },
      error: (err) => {
        if (err.status === 404) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Event not found',
            detail: 'No flood event exists with this ID.'
          });
          this.router.navigate(['/']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load event'
          });
        }
      }
    })
  }

  private calculateTimeSinceEvent(event: FloodEvent) {
    const effectiveDate = new Date(event.effective)
    const hours = (this.now.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60);
    this.hoursSinceEvent.set(Math.round(hours));

    if (hours > 24) {
      this.daysSinceEvent.set(Math.floor(hours / 24));
      this.hoursSinceEvent.set(Math.round(hours % 24));
    }
  }

}