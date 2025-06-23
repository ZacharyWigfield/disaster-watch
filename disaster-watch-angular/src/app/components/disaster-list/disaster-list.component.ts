import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { FloodEvent, UserLocation } from '../../shared/model/floodEventWithUserLocation';
import { EventMapComponent } from '../event-map/event-map.component';

@Component({
  selector: 'app-disaster-list',
  imports: [TableModule, CommonModule, RouterLink, LoadingComponent, EventMapComponent],
  templateUrl: './disaster-list.component.html',
  styleUrl: './disaster-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisasterListComponent {
  private readonly searchService = inject(SearchService)
  readonly floodEventResults = toSignal(this.searchService.floodWarningResults$, { initialValue: [] as FloodEvent[] })
  readonly isLoading = toSignal(this.searchService.searchLoading$, { initialValue: false })
  readonly userLocation = toSignal(this.searchService.userLocation$, { initialValue: { lat: undefined, long: undefined } as UserLocation })

  constructor() { }


}
