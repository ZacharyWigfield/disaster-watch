import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterTableComponent } from './disaster-table.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { mockFloodEvents } from '../../../assets/mock-data/flood-event-mock-data';
import { TableModule } from 'primeng/table';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DisasterTableComponent', () => {
  let fixture: ComponentFixture<DisasterTableComponent>;
  let component: DisasterTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DisasterTableComponent,
        TableModule,
        BrowserAnimationsModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        provideRouter([]),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisasterTableComponent);
    component = fixture.componentInstance;
  });

  it("should input values properly", () => {
    const testEvents = mockFloodEvents
    const testRows = 20

    fixture.componentRef.setInput('events', testEvents);
    fixture.componentRef.setInput('paginateRows', testRows);
    // fixture.detectChanges();

    expect(component.events().length).toEqual(3)
    expect(component.paginateRows()).toEqual(20)
  })
});

