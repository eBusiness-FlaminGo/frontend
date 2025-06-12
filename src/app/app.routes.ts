import {Routes} from '@angular/router';
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
import {LootBoxDetailPageComponent} from './components/loot-box-detail-page/loot-box-detail-page.component';
import {SettingsComponent} from './components/settings/settings.component';
import {LikedFactsComponent} from './components/liked-facts/liked-facts.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import { DailyChallengesComponent } from './components/daily-challenges/daily-challenges.component';

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
  lootBoxDetailPage: "loot-box-detail-page",
  pageNotFound: "page-not-found",
  settings: "settings",
  likedFacts: "liked-facts",
  profile: "profile",
  dailyChallenges: "daily-challenges"
}

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: ROUTES.login, component: LoginComponent},
  {path: ROUTES.facts, component: FactsComponent},
  {path: ROUTES.onboarding, component: OnboardingComponent},
  {path: ROUTES.quizSelection, component: QuizSelectionPageComponent},
  {path: `${ROUTES.quizSelection}/${ROUTES.quiz}/:topic`, component: QuizComponent, data: {hasBackButton: false}},
  {path: `${ROUTES.quizSelection}/${ROUTES.quizResults}`, component: QuizResultComponent},
  {path: ROUTES.stats, component: StatsComponent, data: {hasBackButton: true}},
  {path: ROUTES.shop, component: ShopComponent},
  {path: ROUTES.dailyChallenges, component: DailyChallengesComponent, data: {hasBackButton: true}},
  {
    path: `${ROUTES.shop}/${ROUTES.lootBoxDetailPage}`,
    component: LootBoxDetailPageComponent,
    resolve: {
      quantity: (route: ActivatedRouteSnapshot): number => {
        const quantity = sessionStorage.getItem('lootbox_quantity');
        return quantity ? parseInt(quantity, 10) : 1;
      }
    },
    data: {hasBackButton: false}
  },
  {path: ROUTES.pageNotFound, component: PageNotFoundComponent, data: {hasBackButton: true}},
  {path: ROUTES.settings, component: SettingsComponent, data: {hasBackButton: true}},
  {path: ROUTES.likedFacts, component: LikedFactsComponent, data: {hasBackButton: true}},
  {path: ROUTES.profile, component: ProfileComponent, data: {hasBackButton: true}},
  {path: '**', component: PageNotFoundComponent, data: {hasBackButton: true}},
];
