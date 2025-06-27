import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hamburger-icon',
  standalone: true,
  imports: [],
  templateUrl: './hamburger-icon.component.html',
  styleUrls: ['./hamburger-icon.component.scss'],
})
export class HamburgerIconComponent {
  @Input() isOpen = false;

  @Output() toggleMenu = new EventEmitter<void>();
}
