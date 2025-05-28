import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { FlashFloodWarnings } from '../../shared/model/flashFloodWarnings';

@Component({
  standalone: true,
  selector: 'app-disaster-list',
  imports: [TableModule, CommonModule],
  templateUrl: './disaster-list.component.html',
  styleUrl: './disaster-list.component.scss'
})
export class DisasterListComponent implements OnInit {
  floodWarningResults$: Observable<FlashFloodWarnings[]> | null | undefined;
  searchInitiated = false;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.floodWarningResults$ = this.searchService.floodWarningResults$

    this.floodWarningResults$.subscribe(results => {
      if (results && results.length > 0) {
        this.searchInitiated = true;
      }
    });
  }


}
