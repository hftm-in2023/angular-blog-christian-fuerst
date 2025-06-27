import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'angular-blog-christian-fuerst';
  public backgroundRed = false;
  public receivedMessage = '';

  public toggleBackground() {
    this.backgroundRed = !this.backgroundRed;
  }

  onMessageReceived(msg: string) {
    this.receivedMessage = msg;
  }
}
