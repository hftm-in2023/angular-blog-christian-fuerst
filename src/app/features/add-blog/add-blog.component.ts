import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
          <mat-error>
            @if (formTyped.get('title')?.hasError('required')) {
              <span>Title is required</span>
            } @else if (formTyped.get('title')?.hasError('minlength')) {
              <span>Title must be at least 2 characters long</span>
            } @else if (formTyped.get('title')?.hasError('pattern')) {
              <span>Title must start with a capital letter</span>
            }
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Tell your story...</mat-label>
          <textarea matInput rows="20" formControlName="content"></textarea>
          <mat-error>
            @if (formTyped.get('content')?.hasError('required')) {
              <span>Content is required</span>
            } @else if (formTyped.get('content')?.hasError('minlength')) {
              <span>Content must be at least 50 characters long</span>
            }
          </mat-error>
        </mat-form-field>
      </div>
    </form>

    <button
      type="submit"
      class="submit-button"
      mat-raised-button
      [disabled]="formTyped.invalid"
    >
      Publish blog
    </button>

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
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[A-Z].*'), // Muss mit Großbuchstaben beginnen
        this.customValidator, // Custom Validator hinzufügen
      ],
      asyncValidators: [],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(50), // Mindestens 50 Zeichen
      ],
      asyncValidators: [],
    }),
  });

  // Eigener Validator
  customValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.toLowerCase() === 'test') {
      return { custom: true };
    }
    return null;
  }

  onSubmit() {
    if (this.formTyped.valid) {
      console.log('Form data:', this.formTyped.value);
      // Hier würden die Daten an den Server gesendet
    } else {
      console.log('Form is invalid');
    }
  }
}
