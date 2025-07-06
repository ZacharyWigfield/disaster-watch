import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterListComponent } from './disaster-list.component';
import { SearchService } from '../../services/search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('DisasterListComponent', () => {
  let component: DisasterListComponent;
  let fixture: ComponentFixture<DisasterListComponent>;
  let searchService: SearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisasterListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ]
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(DisasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
