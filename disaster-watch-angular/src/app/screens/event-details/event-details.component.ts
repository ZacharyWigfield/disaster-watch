import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FloodEvent, UserLocation } from '../../shared/model/floodEventWithUserLocation';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Observable, Subscription, take, tap } from 'rxjs';
import { EventMapComponent } from '../../components/event-map/event-map.component';

@Component({
  standalone: true,
  selector: 'app-event-details',
  imports: [ToastModule, CommonModule, EventMapComponent],
  providers: [MessageService],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  id: number = 0
  floodEvent!: FloodEvent
  routeSubscription!: Subscription;
  userLocation$: Observable<UserLocation>
  floodEvents$: Observable<FloodEvent[]>

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.userLocation$ = this.searchService.userLocation$
    this.floodEvents$ = this.searchService.floodWarningResults$
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id')
      if (idParam && !isNaN(+idParam)) {
        this.id = +idParam
        this.floodEvents$.pipe(
          take(1),
          tap(floodEvents => {
            const found = floodEvents.find(event => event.id === this.id);
            if (found) {
              this.floodEvent = found;
            } else {
              this.loadEventById(this.id);
            }
          })
        ).subscribe();
      } else {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  private loadEventById(id: number) {
    this.searchService.getFloodEventByID(id).subscribe({
      next: (data) => {
        this.floodEvent = data
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

}