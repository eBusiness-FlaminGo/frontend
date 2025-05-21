import {Routes} from '@angular/router';
import {isLoggedIn, isSetUp} from './utils/login';
import {FactsComponent} from './components/facts/facts.component';
import {LoginComponent} from './components/login/login.component';
import {OnboardingComponent} from './components/onboarding/onboarding.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {QuizSelectionPageComponent} from './components/quiz-selection-page/quiz-selection-page.component';
import {StatsComponent} from './components/stats/stats.component';

export const ROUTES = {
  facts: "facts",
  login: "login",
  onboarding: "onboarding",
  quizSelection: "quiz-selection",
  stats: "stats",
  pageNotFound: "page-not-found",
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: isLoggedIn() && isSetUp() ? `/${ROUTES.facts}` : `/${ROUTES.login}`,
    pathMatch: 'full',
  },
  {path: ROUTES.facts, component: FactsComponent},
  {path: ROUTES.login, component: LoginComponent},
  {path: ROUTES.onboarding, component: OnboardingComponent},
  {path: ROUTES.quizSelection, component: QuizSelectionPageComponent},
  {path: ROUTES.stats, component: StatsComponent},
  {path: ROUTES.pageNotFound, component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent},
];
