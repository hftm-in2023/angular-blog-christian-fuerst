import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-blog-page',
  standalone: false,
  template: `
    <h1>Neuen Blogeintrag erstellen</h1>
    <p>Formular-Implementierung folgt außerhalb dieses Scopes.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBlogPageComponent {}
