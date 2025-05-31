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
import { SearchCriteria, SearchCriteriaFormGroup } from '../../shared/model/searchCriteria';

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
  today = new Date();
  oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  radiusPickValue = 100;
  searchForm: SearchCriteriaFormGroup = new FormGroup({
    searchBar: new FormControl<string>('', { nonNullable: true }),
    radiusPick: new FormControl<number>(this.radiusPickValue, { nonNullable: true }),
    disasterType: new FormControl<string[]>(DISASTER_TYPES, { nonNullable: true }),
    dateRange: new FormControl<[Date, Date]>([this.oneWeekAgo, this.today], { nonNullable: true })
  });

  handleSearch() {
    const formData: SearchCriteria = this.searchForm.getRawValue();
    this.searchService.getFloodWarnings(formData).subscribe();
  }

  ngOnInit(): void {
  }

}
