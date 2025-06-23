import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { DisasterListComponent } from '../../components/disaster-list/disaster-list.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SearchComponent, DisasterListComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
