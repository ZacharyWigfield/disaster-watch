import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterTableComponent } from './disaster-table.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FloodEvent } from '../../shared/model/floodEventWithUserLocation';
import { mockFloodEvents } from '../../../assets/mock-data/flood-event-mock-data';
import { By } from '@angular/platform-browser';

describe('DisasterTableComponent', () => {
  @Component({
    standalone: true,
    imports: [DisasterTableComponent],
    template: `<app-disaster-table [events]="mockFloodEvents" [paginateRows]="15" />`
  })
  class HostComponent {
    mockFloodEvents: FloodEvent[] = mockFloodEvents
  }

  let hostFixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DisasterTableComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ]
    })
      .compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it("should input values properly", () => {
    hostFixture.detectChanges();
    const disasterTableDebugElement = hostFixture.debugElement.query(By.directive(DisasterTableComponent));
    const disasterTableComponent = disasterTableDebugElement.componentInstance as DisasterTableComponent;

    expect(disasterTableComponent.events.length).toEqual(3)
    expect(disasterTableComponent.paginateRows).toEqual(15)
  })
});
