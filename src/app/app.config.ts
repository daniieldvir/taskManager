import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  LucideChevronDown,
  LucideLogOut,
  LucideMoon,
  LucideSun,
  LucideUser,
  LucideUserStar,
  provideLucideIcons,
} from '@lucide/angular';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideLucideIcons(
      LucideUser,
      LucideUserStar,
      LucideSun,
      LucideMoon,
      LucideLogOut,
      LucideChevronDown,
    ),
  ],
};
