import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Disasters } from '../../shared/model/disasters';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-disaster-list',
  imports: [TableModule, CommonModule],
  templateUrl: './disaster-list.component.html',
  styleUrl: './disaster-list.component.scss'
})
export class DisasterListComponent implements OnInit {
  disasterResults$: Observable<Disasters[] | null> | undefined;
  searchInitiated = false;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.disasterResults$ = this.searchService.disasterResults$;

    this.disasterResults$.subscribe(results => {
      if (results && results.length > 0) {
        this.searchInitiated = true;
      }
    });
  }


}
