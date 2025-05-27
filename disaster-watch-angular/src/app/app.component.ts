import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { DisasterListComponent } from './components/disaster-list/disaster-list.component';

@Component({
  selector: 'app-root',
  imports: [SearchComponent, DisasterListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'disaster-watch';
}
