import { Router } from '@angular/router';
import { ROUTES } from '../app.routes';

export const isInSettings = (router: Router): boolean => {
  return router.url.startsWith(`/${ROUTES.settings}`);
};