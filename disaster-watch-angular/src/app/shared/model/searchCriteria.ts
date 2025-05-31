import { FormControl, FormGroup } from "@angular/forms";

export interface SearchCriteria {
    searchBar: string;
    radiusPick: number;
    disasterType: string[];
    dateRange: [Date, Date];
}

// Utility type to create a FormGroup-compatible control map
export type SearchCriteriaFormGroup = FormGroup<{
  searchBar: FormControl<string>;
  radiusPick: FormControl<number>;
  disasterType: FormControl<string[]>;
  dateRange: FormControl<[Date, Date]>;
}>;

