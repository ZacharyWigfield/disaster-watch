import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { DisasterListComponent } from '../../components/disaster-list/disaster-list.component';

@Component({
  selector: 'app-home',
  imports: [SearchComponent, DisasterListComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
