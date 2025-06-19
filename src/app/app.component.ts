// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss',
// })
// export class AppComponent {
//   title = 'angular-blog-christian-fuerst';
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Wichtig für NgClass/NgStyle in älteren Versionen, gute Praxis
import { FormsModule } from '@angular/forms'; // Wichtig für ngModel (Two-Way Binding)

// Angular Material Module
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // <-- FormsModule hier importieren

    // <-- Alle benötigten Material Module hier importieren
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-blog-christian-fuerst';

  // --- NgModel (Two-Way Binding) ---
  userName = 'Peter Muster';

  // --- @if ---
  wantsGoodieBag = false;

  // --- (click) Event Binding & NgClass ---
  isSubmitted = false;
  submitMessage = 'Anmeldung wurde noch nicht gesendet.';

  // --- @switch ---
  experienceLevel: 'beginner' | 'advanced' | 'expert' = 'beginner';

  // --- @for ---
  eventTopics: { value: string, viewValue: string }[] = [
    { value: 'angular', viewValue: 'Angular Grundlagen' },
    { value: 'react', viewValue: 'React für Einsteiger' },
    { value: 'vue', viewValue: 'Vue.js Deep Dive' }
  ];
  selectedTopic = 'angular';

  // --- NgStyle ---
  dynamicStyle = {
    'color': 'white',
    'font-weight': 'normal'
  };

  // Methode für (click) Event
  onSubmit() {
    this.isSubmitted = true;
    this.submitMessage = `Danke, ${this.userName}! Deine Anmeldung für "${this.getTopicViewValue()}" wurde empfangen.`;

    // NgStyle basierend auf Eingabe ändern
    if (this.wantsGoodieBag) {
      this.dynamicStyle.color = 'green';
      this.dynamicStyle['font-weight'] = 'bold';
    } else {
      this.dynamicStyle.color = 'orange';
      this.dynamicStyle['font-weight'] = 'normal';
    }
  }

  // Hilfsmethode, um den Anzeigenamen des Topics zu bekommen
  private getTopicViewValue(): string {
    const topic = this.eventTopics.find(t => t.value === this.selectedTopic);
    return topic ? topic.viewValue : 'Unbekanntes Thema';
  }
}
