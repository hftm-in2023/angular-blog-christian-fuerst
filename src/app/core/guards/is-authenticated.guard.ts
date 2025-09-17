// src/app/core/guards/is-authenticated.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/roles.util';
import { of } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

export const isAuthenticatedGuard: CanActivateFn = (_route, _state) => {
  const oidc = inject(OidcSecurityService);
  const router = inject(Router);

  // Sicherstellt, dass der Auth-Status initialisiert ist
  return oidc.checkAuth().pipe(
    switchMap((res) => {
      const isAuth = !!res.isAuthenticated;
      if (!isAuth) {
        // Startet den Login – ohne Parameter für maximale Kompatibilität
        oidc.authorize();
        return of(false);
      }

      // Rollenprüfung
      return oidc.getUserData().pipe(
        take(1),
        map((user) => {
          if (!hasRole(user, 'user')) {
            router.navigateByUrl('/blog');
            return false;
          }
          return true;
        }),
      );
    }),
  );
};
