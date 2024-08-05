import { Routes } from '@angular/router';
import { AdvisorListComponent } from './advisor-list/advisor-list.component';
import { AdvisorDetailComponent } from './advisor-detail/advisor-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/advisor-list', pathMatch: 'full' },
  { path: 'advisor-list', component: AdvisorListComponent },
  { path: 'advisor-detail', component: AdvisorDetailComponent },
  { path: 'advisor-detail/:id', component: AdvisorDetailComponent }
];
