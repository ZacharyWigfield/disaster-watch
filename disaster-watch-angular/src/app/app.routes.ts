import { Routes } from '@angular/router';
import { FloodedAreaComponent } from './screens/flooded-area/flooded-area.component';
import { HomeComponent } from './screens/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'flooded-area',
        component: FloodedAreaComponent,
    },
];
