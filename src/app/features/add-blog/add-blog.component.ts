import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-blog',
  imports: [
    RouterLink,
    FormsModule, // Grundlegende Formular-Funktionalität
    ReactiveFormsModule, // Reactive Forms-Direktiven
    MatFormFieldModule, // Material Form Fields
    MatInputModule, // Material Input-Komponenten
    MatButtonModule, // Material Buttons
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Blog hinzufügen</h1>

    <form [formGroup]="formTyped" (ngSubmit)="onSubmit()">
      <div class="blog-input">
        <mat-form-field appearance="fill">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" />
          <mat-error></mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Tell your story...</mat-label>
          <textarea matInput rows="20" formControlName="content"></textarea>
          <mat-error></mat-error>
        </mat-form-field>
      </div>
    </form>

    <button class="submit-button">Publish blog</button>

    <br />

    <button [routerLink]="['/blog/']">Zurück</button>
  `,
  styleUrl: './add-blog.component.scss',
})
export default class BlogDetailComponent {
  formTyped = new FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
  }>({
    title: new FormControl<string>('an exciting title', {
      nonNullable: true,
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (this.formTyped.valid) {
      console.log('Form data:', this.formTyped.value);
      // Hier würden die Daten an den Server gesendet
    } else {
      console.log('Form is invalid');
    }
  }
}
