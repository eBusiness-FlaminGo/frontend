import { Router } from '@angular/router';
import { ROUTES } from '../app.routes';

export const isOnboarding = (router: Router): boolean => {
  return router.url.startsWith(`/${ROUTES.onboarding}`);
};
