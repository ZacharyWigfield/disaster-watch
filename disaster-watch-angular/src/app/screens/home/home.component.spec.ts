import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SearchService } from '../../services/search.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
      ]
    })
      .compileComponents();

    searchService = TestBed.inject(SearchService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
