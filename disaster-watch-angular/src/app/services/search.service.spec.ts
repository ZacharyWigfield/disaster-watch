import { TestBed} from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpRequest, provideHttpClient } from '@angular/common/http';
import { SearchCriteria } from '../shared/model/searchCriteria';
import { FloodEvent, FloodEventWithUserLocation } from '../shared/model/floodEventWithUserLocation';
import { DISASTER_TYPES } from '../shared/constants/disaster-types.constant';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SearchService', () => {
  let searchService: SearchService;
  let httpMock: HttpTestingController;

  const mockCriteria: SearchCriteria = {
    searchBar: 'Austin, TX',
    radiusPick: 50,
    disasterType: ['Flood Warning'],
    dateRange: [new Date('2025-01-01'), new Date('2025-12-31')],
  };
  const mockFloodEvent: FloodEvent = { id: 1, title: 'Flood', location: 'Austin, TX' } as any;
  const mockFloodResponse: FloodEventWithUserLocation = {
    floodEvents: [mockFloodEvent],
    userLat: 30.2672,
    userLong: -97.7431,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        SearchService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    searchService = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should initialize search form with default values', () => {
    const form = searchService.searchForm;
    const range = form.getRawValue().dateRange;
    expect(form.value.searchBar).toBe('');
    expect(form.value.radiusPick).toBe(100);
    expect(form.value.disasterType).toEqual(DISASTER_TYPES);
    expect(range[0]).toBeInstanceOf(Date);
    expect(range[1]).toBeInstanceOf(Date);
  });

  it('should handle error and still finalize loading state', async () => {
    searchService.getFloodEvents(mockCriteria);

    const req = httpMock.expectOne((req: HttpRequest<any>) =>
      req.method === 'GET' &&
      req.url === 'http://localhost:8080/api/disasters/floods/events' &&
      req.params.get('searchLocation') === 'Austin, TX' &&
      req.params.get('radius') === '50' &&
      req.params.get('startDate') === mockCriteria.dateRange[0].toISOString() &&
      req.params.get('endDate') === mockCriteria.dateRange[1].toISOString() &&
      req.params.getAll('eventType')!.includes('Flood Warning')
    );

    expect(searchService.isLoading()).toBeTrue();
    req.flush({}, { status: 500, statusText: 'Server Error' });
    await Promise.resolve();
    expect(searchService.isLoading()).toBeFalse();
  });

it('should fetch flood warnings and update subjects + isLoading state', () => {
  expect(searchService.floodEvents()).toEqual([]);
  expect(searchService.userLocation()).toEqual({ lat: undefined, long: undefined });
  expect(searchService.isLoading()).toBeFalse();

  searchService.getFloodEvents(mockCriteria);
  expect(searchService.isLoading()).toBeTrue();

  const req = httpMock.expectOne((req: HttpRequest<any>) =>
    req.method === 'GET' &&
    req.url === 'http://localhost:8080/api/disasters/floods/events' &&
    req.params.get('searchLocation') === 'Austin, TX' &&
    req.params.get('radius') === '50' &&
    req.params.get('startDate') === mockCriteria.dateRange[0].toISOString() &&
    req.params.get('endDate') === mockCriteria.dateRange[1].toISOString() &&
    req.params.getAll('eventType')!.includes('Flood Warning')
  );
  req.flush(mockFloodResponse);

  expect(searchService.floodEvents()).toEqual(mockFloodResponse.floodEvents);
  expect(searchService.userLocation()).toEqual({
    lat: mockFloodResponse.userLat,
    long: mockFloodResponse.userLong,
  });

  expect(searchService.isLoading()).toBeFalse();
});

it('should fetch flood event by ID', () => {
  searchService.getFloodEventByID(1).subscribe(event => {
    expect(event).toEqual(mockFloodEvent);
  });

  const req = httpMock.expectOne('http://localhost:8080/api/disasters/floods/events/1');
  expect(req.request.method).toBe('GET');
  req.flush(mockFloodEvent);
});

it('should fetch intersecting events within a year by ID', () => {
  const mockEvents: FloodEvent[] = [mockFloodEvent];

  searchService.getIntersectingEventsWithinYear(1).subscribe(events => {
    expect(events).toEqual(mockEvents);
  });

  const req = httpMock.expectOne('http://localhost:8080/api/disasters/floods/events/intersecting/1');
  expect(req.request.method).toBe('GET');
  req.flush(mockEvents);
});

});
