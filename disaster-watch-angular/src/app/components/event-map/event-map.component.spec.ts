import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMapComponent } from './event-map.component';
import { SearchService } from '../../services/search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FloodEvent } from '../../shared/model/floodEventWithUserLocation';

describe('EventMapComponent', () => {
  @Component({
    standalone: true,
    imports: [EventMapComponent],
    template: `<app-event-map [mapId]="'1'" [floodEvents]="mockFloodEvents" [userLat]="-95"
                [userLong]="32" />`
  })
  class HostComponent {
    mockFloodEvents: FloodEvent[] = [{
      id: 510,
      areaDesc: ["Angelina, TX",],
      event: "Flood Warning",
      description: "...The Flood Warning ",
      certainty: "Observed",
      severity: "Severe",
      urgency: "Immediate",
      effective: "2025-07-02T13:22:00Z",
      expires: "2025-07-03T15:00:00Z",
      latitude: 31.54,
      longitude: -94.84,
      userToEventDistance: 142.84214825297852,
      polygonGeoJson: {
        coordinates: [[[-94.84, 31.54], [-94.72, 31.47],]],
        type: "Polygon"
      }
    }]
  }

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ]
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
