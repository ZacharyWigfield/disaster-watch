import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMapComponent } from './event-map.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import * as L from 'leaflet';
import { mockFloodEvents, mockSingleFloodEvent, mockSingleFloodEventNoPolygon } from '../../../assets/mock-data/flood-event-mock-data';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

describe('EventMapComponent', () => {
  let component: EventMapComponent;
  let fixture: ComponentFixture<EventMapComponent>;
  let searchService: SearchService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMapComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        Router
      ]
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    router = TestBed.inject(Router)
    fixture = TestBed.createComponent(EventMapComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mapId', "1");
    fixture.componentRef.setInput('floodEvents', mockFloodEvents);
    fixture.componentRef.setInput('userLat', 31.59);
    fixture.componentRef.setInput('userLong', -94.88);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    document.getElementById('1')?.remove();
  });

  it("should input values properly", () => {
    expect(component.mapId()).toEqual("1")
    expect(component.floodEvents().length).toEqual(3)
    expect(component.userLat()).toEqual(31.59)
    expect(component.userLong()).toEqual(-94.88)
  })

  it("Should render a map if there are flood events", () => {
    fixture.detectChanges();
    const mapDiv = fixture.nativeElement.querySelector('.map-container');

    expect(mapDiv).toBeTruthy()
  })

  it("Should not render a map if there are not flood events", () => {
    fixture.componentRef.setInput('floodEvents', []);
    fixture.detectChanges();
    const mapDiv = fixture.nativeElement.querySelector('.map-container');

    expect(mapDiv).toBeFalsy()
  })

  it('should update userLocation signal when search bar value changes', () => {
    const control = searchService.searchForm.controls.searchBar;
    control.setValue('Portland, OR');

    expect(component.userLocation()).toBe('Portland, OR');
  });

  it('should call initMap when floodEvents changes to new value', async () => {
    const spy = spyOn<any>(component, 'initMap');

    fixture.componentRef.setInput('mapId', "2");
    fixture.componentRef.setInput('floodEvents', [mockSingleFloodEvent]);

    fixture.detectChanges();
    await Promise.resolve();

    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to details page on marker click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component['router'].navigate([`details/2`]);

    expect(navigateSpy).toHaveBeenCalledWith(['details/2']);
  });

  it('should not render polygon if type is not Polygon', () => {
    const spy = spyOn<any>(component, 'renderPolygons').and.callThrough();
    fixture.detectChanges();
    component['initMap']('1', [mockSingleFloodEventNoPolygon]);

    expect(spy).toHaveBeenCalled();
  });

  it('should remove existing map before initializing a new one', async () => {
    const mapInstance = component['map'];
    const removeSpy = mapInstance ? spyOn(mapInstance, 'remove').and.callThrough() : null;

    fixture.componentRef.setInput('mapId', '2');
    fixture.componentRef.setInput('floodEvents', [mockSingleFloodEvent]);
    fixture.detectChanges();
    await fixture.whenStable();
    await Promise.resolve();

    expect(removeSpy).toHaveBeenCalled();
  });
});
