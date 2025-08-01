import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisasterListComponent } from './disaster-list.component';
import { SearchService } from '../../services/search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { FloodEvent } from '../../shared/model/floodEventWithUserLocation';
import { Component, Input, provideZonelessChangeDetection } from '@angular/core';
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
    @Input() paginateRows!: number;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisasterListComponent, MockDisasterTableComponent],
      providers: [
        provideZonelessChangeDetection(),
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

    searchService.floodEvents.set(mockFloodEvents)
    fixture.detectChanges();
    await fixture.whenStable();
    await Promise.resolve();
  });

  it('should display component when event results are > 0, then hide when results are = 0', () => {
    let containerDiv = fixture.nativeElement.querySelector(".content-container")
    expect(containerDiv).toBeTruthy()

    searchService.floodEvents.set([]);
    fixture.detectChanges();

    containerDiv = fixture.nativeElement.querySelector(".content-container")
    expect(containerDiv).toBeFalsy();
  })

  it('should display a div with list of events', () => {
    const disasterList = fixture.nativeElement.querySelector("#disaster-list-div")
    expect(disasterList).toBeTruthy()
  })

  it('should display a div with event map', () => {
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
