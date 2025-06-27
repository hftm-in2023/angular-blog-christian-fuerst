import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { GlobalErrorHandlerService } from './errorHandler/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    
    provideAnimations(),
  ],
};
