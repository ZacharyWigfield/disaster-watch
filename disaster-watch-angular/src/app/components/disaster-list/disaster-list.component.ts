import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Disasters } from '../../shared/model/disasters';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  selector: 'app-disaster-list',
  imports: [TableModule, CommonModule],
  templateUrl: './disaster-list.component.html',
  styleUrl: './disaster-list.component.scss'
})
export class DisasterListComponent implements OnInit {
  disasters: Disasters[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.disasterResults$.subscribe(results => {
      this.disasters = results
    })
  }

}
