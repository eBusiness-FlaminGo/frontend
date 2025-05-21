import {Routes} from '@angular/router';
import {isLoggedIn, isSetUp} from './utils/login';
import {FactsComponent} from './components/facts/facts.component';
import {LoginComponent} from './components/login/login.component';
import {OnboardingComponent} from './components/onboarding/onboarding.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {StatsComponent} from './components/stats/stats.component';
import {
  QuizSelectionPageComponent
} from './components/quiz-components/quiz-selection-page/quiz-selection-page.component';
import {QuizComponent} from './components/quiz-components/quiz/quiz.component';
import {QuizResultComponent} from './components/quiz-components/quiz-result/quiz-result.component';
import {ShopComponent} from './components/shop/shop.component';


export const ROUTES = {
  root: "/",
  facts: "facts",
  login: "login",
  onboarding: "onboarding",
  quizSelection: "quiz-selection",
  quiz: "quiz",
  quizResults: "quiz-results",
  stats: "stats",
  shop: "shop",
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
  {path: `${ROUTES.quizSelection}/${ROUTES.quiz}/:topic`, component: QuizComponent},
  {path: `${ROUTES.quizSelection}/${ROUTES.quizResults}`, component: QuizResultComponent},
  {path: ROUTES.stats, component: StatsComponent},
  {path: ROUTES.shop, component: ShopComponent},
  {path: ROUTES.pageNotFound, component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent},
];
