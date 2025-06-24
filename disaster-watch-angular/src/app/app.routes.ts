import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./screens/event-details/event-details.component').then(m => m.EventDetailsComponent)
    },
];
