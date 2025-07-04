import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { provideHttpClientTesting} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SearchService', () => {
  let searchService: SearchService;

  beforeEach(() => {
   TestBed.configureTestingModule({
      providers: [
        SearchService,
        provideHttpClient(),         
        provideHttpClientTesting()  
      ]
    });

    searchService = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(searchService).toBeTruthy();
  });
});
