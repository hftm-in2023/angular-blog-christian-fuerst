import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { hasRole } from '../auth/roles.util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <div class="nav-links" [class.open]="isMenuOpen">
        <a [routerLink]="['/blog']" (click)="closeMenu()">Blog</a>

        <!-- Nur für user-Role sichtbar -->
        <a
          *ngIf="hasUserRole$ | async"
          [routerLink]="['/add-blog']"
          (click)="closeMenu()"
        >+ Neuer Blog</a>
      </div>

      <div class="nav-user" *ngIf="(isAuthenticated$ | async)">
        <span class="username">Hallo, {{ userName$ | async }}</span>
      </div>

      <div class="nav-user" *ngIf="(isAuthenticated$ | async) as loggedIn">
        <ng-container *ngIf="!loggedIn; else logged">
          <button type="button" (click)="login()">Login</button>
        </ng-container>
        <ng-template #logged>
          <span class="username">Hallo, {{ userName$ | async }}</span>
          <button type="button" (click)="logout()">Logout</button>
        </ng-template>
      </div>

      <app-hamburger-icon (click)="toggleMenu()" [isOpen]="isMenuOpen"></app-hamburger-icon>
    </nav>
  `,
  styleUrl: './navbar.component.scss',
  imports: [HamburgerIconComponent, RouterLink, AsyncPipe, NgIf],
  standalone: true,
})
export class NavbarComponent {
  private oidc = inject(OidcSecurityService);

  // öffentliche Methoden für das Template
  login()  { this.oidc.authorize(); }
  logout() { this.oidc.logoff(); }

  isMenuOpen = false;

  // robust gegen unterschiedliche Rückgabeformen der Lib
  isAuthenticated$ = this.oidc.isAuthenticated$.pipe(
    map((v: any) => (typeof v === 'boolean' ? v : !!v?.isAuthenticated)),
  );

  userName$ = this.oidc.userData$.pipe(
    map((u: any) => u?.preferred_username || u?.name || u?.email || 'User'),
  );

  hasUserRole$ = this.oidc.userData$.pipe(map((u: any) => hasRole(u, 'user')));

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  closeMenu() { this.isMenuOpen = false; }
}
