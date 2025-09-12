import { ApplicationConfig, ErrorHandler, APP_INITIALIZER, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { GlobalErrorHandlerService } from './core/errorHandler/global-error-handler.service';

import { provideAuth, LogLevel, OidcSecurityService } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      // nur noch der Error-Interceptor – Token hängt die OIDC-Lib selbst an
      withInterceptors([errorInterceptor]),
    ),
    provideAnimations(),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },

    // OIDC-Konfiguration
    provideAuth({
      config: {
        // TODO: <authority> & <clientId> aus eurer Keycloak-Instanz einsetzen
        authority: 'https://<keycloak-azure>/realms/<realm>',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: '<client-id>',
        responseType: 'code',
        scope: 'openid profile email roles', // Rollen-Claims laden
        silentRenew: true,
        useRefreshToken: true,
        // hier euer Backend, damit der Interceptor dort Tokens anhängt
        secureRoutes: [
          'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io',
        ],
        logLevel: LogLevel.Error,
      },
    }),

    // Beim App-Start einmal checkAuth ausführen
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const oidc = inject(OidcSecurityService);
        return () => oidc.checkAuth().toPromise();
      },
    },
  ],
};
