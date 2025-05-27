import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelect } from 'primeng/multiselect';
import { Slider } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { SearchService } from '../../services/search.service';
import { DISASTER_TYPES } from '../../shared/constants/disaster-types.constant';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [ReactiveFormsModule, Slider, DatePicker, MultiSelect, ButtonModule, InputTextModule, FloatLabel],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent implements OnInit {

  constructor(
    private searchService: SearchService
  ) { }

  DISASTER_TYPES = DISASTER_TYPES
  today = new Date()
  oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  radiusPickValue = 50
  searchForm = new FormGroup({
    searchBar: new FormControl<string>(''),
    radiusPick: new FormControl<number>(this.radiusPickValue),
    disasterType: new FormControl<string[]>(DISASTER_TYPES),
    dateRange: new FormControl<Date[]>([this.today, this.oneWeekAgo])
  })

  handleSearch() {
    const formData = this.searchForm.value;
    const jsonData = JSON.stringify(formData);
    this.searchService.getSearchResults().subscribe();
  }


  ngOnInit(): void {
  }

}
