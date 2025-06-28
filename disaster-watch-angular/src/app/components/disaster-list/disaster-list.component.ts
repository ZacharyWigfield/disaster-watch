import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FloodEvent, UserLocation } from '../../shared/model/floodEventWithUserLocation';
import { EventMapComponent } from '../event-map/event-map.component';
import { DisasterTableComponent } from '../disaster-table/disaster-table.component';

@Component({
  selector: 'app-disaster-list',
  imports: [CommonModule, LoadingComponent, EventMapComponent, DisasterTableComponent],
  templateUrl: './disaster-list.component.html',
  styleUrl: './disaster-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisasterListComponent {
  private readonly searchService = inject(SearchService)
  readonly floodEventResults: Signal<FloodEvent[]> = toSignal(this.searchService.floodWarningsSubject, { initialValue: [] })
  readonly isLoading: Signal<boolean> = this.searchService.isLoading
  readonly userLocation: Signal<UserLocation> = toSignal(this.searchService.userLocationSubject, { initialValue: { lat: undefined, long: undefined } })

  constructor() { }

}
