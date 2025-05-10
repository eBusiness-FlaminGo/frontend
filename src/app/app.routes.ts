import { Routes } from '@angular/router';
import { isLoggedIn, isSetUp } from './utils/login';
import { FactsComponent } from './components/facts/facts.component';
import { LoginComponent } from './components/login/login.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: isLoggedIn() && isSetUp() ? '/facts' : '/login',
    pathMatch: 'full',
  },
  { path: 'facts', component: FactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: '**', component: PageNotFoundComponent },
];
