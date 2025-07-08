import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EventDetailsComponent } from './event-details.component';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { mockFloodEvents, mockSingleFloodEvent } from '../../../assets/mock-data/flood-event-mock-data';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { FloodEvent } from '../../shared/model/floodEventWithUserLocation';
import { DisasterTableComponent } from '../../components/disaster-table/disaster-table.component';
import { CardModule } from 'primeng/card';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;
  let searchService: SearchService;
  let router: Router;
  let messageService: MessageService;
  let paramMapSubject = new BehaviorSubject(convertToParamMap({ id: '510' }));

  @Component({
    selector: 'app-disaster-table',
    template: '',
    standalone: true,
  })
  class MockDisasterTableComponent {
    @Input() events!: FloodEvent[];
    @Input() paginateRows!: number;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsComponent, MockDisasterTableComponent, CardModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        SearchService,
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramMapSubject.asObservable(),
          },
        }
      ],
    }).overrideComponent(EventDetailsComponent, {
      remove: {
        imports: [DisasterTableComponent]
      },
      add: {
        imports: [MockDisasterTableComponent, CardModule]
      }
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    router = TestBed.inject(Router)
    messageService = TestBed.inject(MessageService)
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;

  });

  it('should load component with valid param ID', () => {
    fixture.detectChanges();
    const containerDiv = fixture.nativeElement.querySelector(".event-details-container")

    expect(containerDiv).toBeTruthy()
  });

  it('should navigate to root if id param is invalid', () => {
    const navigateSpy = spyOn(router, 'navigate')
    paramMapSubject.next(convertToParamMap({ id: 'notANumber' }));
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should call loadEventByPreviousSearchData when floodEvents contains matching ID', fakeAsync(() => {
    searchService.floodEventsSubject.next(mockFloodEvents);
    paramMapSubject.next(convertToParamMap({ id: '510' }));

    const spy = spyOn<any>(EventDetailsComponent.prototype, 'loadEventByPreviousSearchData').and.callThrough();

    fixture.detectChanges();
    tick();

    expect(spy).toHaveBeenCalled();
  }));

  it('should call loadEventById when floodEvents does not contain matching ID', fakeAsync(() => {
    searchService.floodEventsSubject.next(mockFloodEvents);
    paramMapSubject.next(convertToParamMap({ id: '999' }));

    const spy = spyOn<any>(EventDetailsComponent.prototype, 'loadEventById').and.callFake(() => { });

    fixture.detectChanges();
    tick();

    expect(spy).toHaveBeenCalled();
  }));

  it('should call loadEventById when floodEvents does not contain any value', fakeAsync(() => {
    searchService.floodEventsSubject.next([]);
    paramMapSubject.next(convertToParamMap({ id: '999' }));

    const spy = spyOn<any>(EventDetailsComponent.prototype, 'loadEventById').and.callFake(() => { });

    fixture.detectChanges();
    tick();

    expect(spy).toHaveBeenCalled();
  }));

  it('should calculate time since event', fakeAsync(() => {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 1000 * 60 * 60 * 48);
    const inTwoDays = new Date(now.getTime() + 1000 * 60 * 60 * 48);

    const testEvent = {
      ...mockSingleFloodEvent,
      effective: twoDaysAgo.toISOString(),
      expires: inTwoDays.toISOString()
    };

    component['loadEventByPreviousSearchData'](testEvent);
    tick();
    fixture.detectChanges();

    expect(component.daysSinceEvent()).toBe(2);
    expect(component.hoursSinceEvent()).toBe(0);
    expect(component.isEventStillOccuring()).toBe('YES');
  }));

  it('should load intersecting events on init', fakeAsync(() => {
    spyOn(searchService, 'getIntersectingEventsWithinYear').and.returnValue(of(mockFloodEvents));
    paramMapSubject.next(convertToParamMap({ id: '510' }));

    fixture.detectChanges();
    tick();

    expect(component.intersectingEvents()).toEqual(mockFloodEvents);
    expect(component.id()).not.toBeNull();
    expect(searchService.getIntersectingEventsWithinYear).toHaveBeenCalledWith(component.id()!);
  }));
});