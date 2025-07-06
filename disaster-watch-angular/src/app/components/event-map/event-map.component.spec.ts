import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMapComponent } from './event-map.component';
import { SearchService } from '../../services/search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('EventMapComponent', () => {
  let component: EventMapComponent;
  let fixture: ComponentFixture<EventMapComponent>;
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMapComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ]
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(EventMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
