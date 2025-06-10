import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { EventDetailsComponent } from './screens/event-details/event-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'details/:id',
        component: EventDetailsComponent,
    },
];
