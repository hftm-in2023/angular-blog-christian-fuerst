import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HamburgerIconComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
