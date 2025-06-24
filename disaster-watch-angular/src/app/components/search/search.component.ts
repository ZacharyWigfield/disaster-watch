import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelect } from 'primeng/multiselect';
import { Slider } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FloatLabel } from 'primeng/floatlabel';
import { SearchService } from '../../services/search.service';
import { DISASTER_TYPES } from '../../shared/constants/disaster-types.constant';
import { SearchCriteria, SearchCriteriaFormGroup } from '../../shared/model/searchCriteria';


@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, Slider, DatePicker, MultiSelect,
    ButtonModule, InputTextModule, FloatLabel, ToastModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchComponent {
  private searchService = inject(SearchService);

  readonly disasterTypes = DISASTER_TYPES
  readonly form: SearchCriteriaFormGroup = this.searchService.searchForm;
  radiusLabel = signal(`${this.searchService.searchForm.controls.radiusPick.value} miles`);

  constructor() {
    this.searchService.searchForm.controls.radiusPick.valueChanges.subscribe(value => {
      this.radiusLabel.set(`${value} miles`);
    })
  }

  handleSearch() {
    if (!this.form.valid) return;

    const formData: SearchCriteria = this.form.getRawValue();
    this.searchService.getFloodWarnings(formData)
  }

}
