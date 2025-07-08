import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SearchCriteria } from '../../shared/model/searchCriteria';
import { DISASTER_TYPES } from '../../shared/constants/disaster-types.constant';
import { SearchService } from '../../services/search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  const mockCriteria: SearchCriteria = {
    searchBar: 'Austin, TX',
    radiusPick: 50,
    disasterType: ['Flood Warning'],
    dateRange: [new Date('2025-01-01'), new Date('2025-12-31')],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ]
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render all inputs and buttons correctly', () => {
    expect(fixture.nativeElement.querySelector("#locationSearch")).toBeTruthy();
    expect(fixture.nativeElement.querySelector("#radiusPickSlider")).toBeTruthy();
    expect(fixture.nativeElement.querySelector("#disasterType")).toBeTruthy();
    expect(fixture.nativeElement.querySelector("#date")).toBeTruthy();
    expect(fixture.nativeElement.querySelector("#searchButton")).toBeTruthy();
  })

  it('should disable search button when form is invalid', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector("#searchButton")!;
    expect(component.form.valid).toBeFalse();
    expect(button.disabled).toBeTrue();
  });

  it('should enable search button when form is valid', () => {
    component.form.setValue(mockCriteria);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector("#searchButton")!;
    expect(component.form.valid).toBeTrue();
    expect(button.disabled).toBeFalse();
  });

  it('should expect form to have initial values and form values change when user changes input values', () => {
    const form = component.form;
    const range = form.getRawValue().dateRange;
    expect(form.value.searchBar).toBe('');
    expect(form.value.radiusPick).toBe(100);
    expect(form.value.disasterType).toEqual(DISASTER_TYPES);
    expect(range[0]).toBeInstanceOf(Date);
    expect(range[1]).toBeInstanceOf(Date);

    const input: HTMLInputElement = fixture.nativeElement.querySelector('#locationSearch')!;
    input.value = 'New York';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.form.controls.searchBar.value).toBe('New York')
  })

  it('should expect radius label to change when radius form value changes', () => {
    component.form.controls.radiusPick.setValue(200);
    fixture.detectChanges();

    expect(component.radiusLabel()).toBe('200 miles');
  })

  it('should perform proper search service API call when handleSearch() is called', () => {
    spyOn(searchService, 'getFloodEvents');
    component.form.setValue(mockCriteria);
    component.handleSearch();
    expect(searchService.getFloodEvents).toHaveBeenCalledWith(mockCriteria);

  })

  it('should not perform search if form is invalid', () => {
  const spy = spyOn(searchService, 'getFloodEvents');
  component.form.reset(); 
  component.handleSearch();

  expect(spy).not.toHaveBeenCalled();
});

});
