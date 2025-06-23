import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FloodEvent } from '../../shared/model/floodEventWithUserLocation';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-disaster-list',
  imports: [TableModule, CommonModule, RouterLink, LoadingComponent],
  templateUrl: './disaster-list.component.html',
  styleUrl: './disaster-list.component.scss'
})
export class DisasterListComponent implements OnInit {
  floodWarningResults$: Observable<FloodEvent[]>;
  searchInitiated = false;
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {
    this.floodWarningResults$ = this.searchService.floodWarningResults$;
   }

  ngOnInit() {
    this.searchService.searchLoading$
    .pipe(takeUntil(this.destroy$))
    .subscribe(loading => this.isLoading = loading);

    this.floodWarningResults$
    .pipe(takeUntil(this.destroy$))
    .subscribe(results => {
      if (results && results.length > 0) {
        this.searchInitiated = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
