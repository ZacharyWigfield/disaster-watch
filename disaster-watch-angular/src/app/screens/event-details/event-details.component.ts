import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FloodEvent } from '../../shared/model/floodWarnings';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-event-details',
  imports: [],
  providers: [MessageService],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  id: number = 0
  floodEvent: FloodEvent | undefined
  private routeSubscription!: Subscription;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id')
      if (idParam && !isNaN(+idParam)) {
        this.id = +idParam
        this.loadEventById(this.id);
      } else {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  private loadEventById(id: number) {
    this.searchService.getFloodEventByID(this.id).subscribe({
      next: (data) => {
        this.floodEvent = data
        console.log(this.floodEvent)
      },
      error: (err) => {
        if (err.status === 404) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Event not found',
            detail: 'No flood event exists with this ID.'
          });
          this.router.navigate(['/']); // or homepage
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