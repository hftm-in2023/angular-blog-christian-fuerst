import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './core/navbar/navbar.component';
import { StateHandler } from './core/state-management/appstate.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected title = 'angular-blog-christian-fuerst';
  public backgroundRed = false;
  public receivedMessage = '';

  private readonly stateHandler = inject(StateHandler);
  public appState = this.stateHandler.actState;

  public toggleBackground() {
    this.backgroundRed = !this.backgroundRed;
  }

  onMessageReceived(msg: string) {
    this.receivedMessage = msg;
  }
}
