import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { MultiSelect } from 'primeng/multiselect';
import { Slider } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FloatLabel } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
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
  private messageService = inject(MessageService);

  readonly DISASTER_TYPES = DISASTER_TYPES
  readonly today = new Date();
  readonly oneWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  readonly radiusPickValue = 100;

  readonly searchForm: SearchCriteriaFormGroup = new FormGroup({
    searchBar: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    radiusPick: new FormControl<number>(this.radiusPickValue, { nonNullable: true }),
    disasterType: new FormControl<string[]>(DISASTER_TYPES, { nonNullable: true }),
    dateRange: new FormControl<[Date, Date]>([this.oneWeekAgo, this.today], { nonNullable: true })
  });

  readonly radiusLabel = computed(() => `Radius: ${this.searchForm.get('radiusPick')?.value || 0} miles`);

  constructor() { }

  handleSearch() {
    if (!this.searchForm.valid) return;

    const formData: SearchCriteria = this.searchForm.getRawValue();
    this.searchService.getFloodWarnings(formData).subscribe()
  }

}
