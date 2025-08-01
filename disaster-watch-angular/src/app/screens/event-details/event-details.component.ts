import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FloodEvent, UserLocation } from '../../shared/model/floodEventWithUserLocation';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventMapComponent } from '../../components/event-map/event-map.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DisasterTableComponent } from '../../components/disaster-table/disaster-table.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-event-details',
  imports: [ToastModule, CommonModule, EventMapComponent, DisasterTableComponent, CardModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public searchService = inject(SearchService);
  private messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly now: Date = new Date();
  daysSinceEvent = signal<number>(0);
  hoursSinceEvent = signal<number>(0);
  isEventStillOccuring = signal<String>("NO");

  private readonly paramMapSignal = toSignal(this.route.paramMap);
  readonly floodEvent = signal<FloodEvent | undefined>(undefined);
  readonly intersectingEvents = signal<FloodEvent[]>([])

  readonly id = computed(() => {
    const idParam = this.paramMapSignal()?.get('id');
    return idParam && !isNaN(+idParam) ? +idParam : null;
  });

  lastId: number | null = null;

  constructor() {
    effect(() => {
      const id = this.id();
      const floodEvents = this.searchService.floodEvents();

      if (id === null) {
        this.router.navigate(['/']);
        return;
      }

      if (floodEvents?.length) {
        const found = floodEvents.find(event => event.id === id);
        if (found) {
          this.loadEventByPreviousSearchData(found);
        } else {
          this.loadEventById(id);
        }
      } else {
        this.loadEventById(id);
      }

      if (id !== this.lastId) {
        this.getIntersectingEventsWithinYear(id);
        this.lastId = id;
      }

    });
  }

  private loadEventByPreviousSearchData(foundEvent: FloodEvent) {
    this.floodEvent.set(foundEvent);
    this.calculateTimeSinceEvent(foundEvent);
  }

  private loadEventById(id: number) {
    this.searchService.getFloodEventByID(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data: FloodEvent) => {
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

  private getIntersectingEventsWithinYear(id: number) {
    this.searchService.getIntersectingEventsWithinYear(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data: FloodEvent[]) => {
        this.intersectingEvents.set(data);
      }
    })
  }

  private calculateTimeSinceEvent(event: FloodEvent) {
    const effectiveDate = new Date(event.effective)
    const expireDate = new Date(event.expires)
    const now = new Date()
    const hours = (this.now.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60);
    this.hoursSinceEvent.set(Math.round(hours));

    if (hours > 24) {
      this.daysSinceEvent.set(Math.floor(hours / 24));
      this.hoursSinceEvent.set(Math.round(hours % 24));
    }

    if (expireDate > now) {
      this.isEventStillOccuring.set("YES")
    }
  }

}