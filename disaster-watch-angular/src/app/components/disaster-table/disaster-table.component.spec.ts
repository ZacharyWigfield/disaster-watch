import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterTableComponent } from './disaster-table.component';
import { SearchService } from '../../services/search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('DisasterTableComponent', () => {
  let component: DisasterTableComponent;
  let fixture: ComponentFixture<DisasterTableComponent>;
  let searchService: SearchService

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

    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(DisasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
