import { Routes } from '@angular/router';
import { LeadList } from './features/leads/lead-list/lead-list';
import { LeadForm } from './features/leads/lead-form/lead-form';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'addLead', component: LeadForm},
  { path: 'leads', component: LeadList },
];

