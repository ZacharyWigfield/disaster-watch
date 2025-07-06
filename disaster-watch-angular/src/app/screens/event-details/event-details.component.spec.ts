import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        ActivatedRoute
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
