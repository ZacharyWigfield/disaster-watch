import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisasterListComponent } from './disaster-list.component';
import { SearchService } from '../../services/search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { FloodEvent } from '../../shared/model/floodEventWithUserLocation';
import { Component, Input } from '@angular/core';
import { DisasterTableComponent } from '../disaster-table/disaster-table.component';
import { mockFloodEvents } from '../../../assets/mock-data/flood-event-mock-data';

describe('DisasterListComponent', () => {
  let component: DisasterListComponent;
  let fixture: ComponentFixture<DisasterListComponent>;
  let searchService: SearchService

  @Component({
    selector: 'app-disaster-table',
    template: '',
    standalone: true,
  })
  class MockDisasterTableComponent {
    @Input() events!: FloodEvent[];
    @Input() rows!: number;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisasterListComponent, MockDisasterTableComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ]
    }).overrideComponent(DisasterListComponent, {
      remove: {
        imports: [DisasterTableComponent]
      },
      add: {
        imports: [MockDisasterTableComponent] 
      }
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(DisasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display component when event results are > 0, then hide when results are = 0', () => {
    searchService.floodEventsSubject.next(mockFloodEvents)
    fixture.detectChanges()

    let containerDiv = fixture.nativeElement.querySelector(".content-container")
    expect(containerDiv).toBeTruthy()

    searchService.floodEventsSubject.next([]);
    fixture.detectChanges();

    containerDiv = fixture.nativeElement.querySelector(".content-container")
    expect(containerDiv).toBeFalsy();
  })

  it('should display a div with list of events', () => {
    searchService.floodEventsSubject.next(mockFloodEvents)
    fixture.detectChanges()

    const disasterList = fixture.nativeElement.querySelector("#disaster-list-div")
    expect(disasterList).toBeTruthy()
  })

  it('should display a div with event map', () => {
    searchService.floodEventsSubject.next(mockFloodEvents)
    fixture.detectChanges()

    const eventMap = fixture.nativeElement.querySelector("#map-div")
    expect(eventMap).toBeTruthy()
  })

  it('should show loading spinner when isLoading is true', () => {
    searchService.isLoading.set(true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('app-loading');
    expect(spinner).toBeTruthy();
  });

});
