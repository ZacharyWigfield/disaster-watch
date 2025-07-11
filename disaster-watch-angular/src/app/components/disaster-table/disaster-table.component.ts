import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FloodEvent } from '../../shared/model/floodEventWithUserLocation';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-disaster-table',
  imports: [CommonModule, TableModule, RouterLink, Tag],
  templateUrl: './disaster-table.component.html',
  styleUrl: './disaster-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisasterTableComponent {
  readonly events = input<FloodEvent[]>([])
  readonly paginateRows = input<number>(10)

}
