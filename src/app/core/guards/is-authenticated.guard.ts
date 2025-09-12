import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/roles.util';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

export const isAuthenticatedGuard: CanActivateFn = (_route, state) => {
  const oidc = inject(OidcSecurityService);
  const router = inject(Router);

  // Warten bis die Lib geladen hat (isLoading$), dann auth + Rollen prüfen
  return combineLatest([oidc.isLoading$, oidc.isAuthenticated$]).pipe(
    filter(([loading]) => !loading),
    take(1),
    switchMap(([_loading, isAuth]) => {
      const authenticated = typeof isAuth === 'boolean' ? isAuth : !!(isAuth as any)?.isAuthenticated;
      if (!authenticated) {
        // startet den OIDC-Flow
        oidc.authorize({ customParams: { prompt: 'login' } });
        return of(false);
      }
      return oidc.getUserData().pipe(
        map((user: any) => {
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
