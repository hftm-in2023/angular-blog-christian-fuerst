import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
            @if (formTyped.get('title')?.hasError('custom')) {
              <span>Custom error: Title cannot be 'Test'</span>
            } @else if (formTyped.get('title')?.hasError('customAsync')) {
              <span>Custom async error: Title cannot be 'Test Async'</span>
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

    <div class="button-group">
      <button
        type="submit"
        class="submit-button"
        mat-raised-button
        [disabled]="formTyped.invalid"
      >
        Publish blog
      </button>

      <button type="reset" mat-raised-button>Reset</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button [routerLink]="['/blog/']">Zurück</button>
    </div>
  `,
  styleUrl: './add-blog.component.scss',
})
export default class BlogDetailComponent {
  destroyRef = inject(DestroyRef);

  constructor() {
    // Auf Wertänderungen reagieren
    this.formTyped.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log('Form value changed:', value);
        // Hier kannst du auf Änderungen reagieren
      });

    // Auf Status-Änderungen reagieren
    this.formTyped.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        console.log('Form status changed:', status);
        // Status: VALID, INVALID, PENDING, DISABLED
      });
  }

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
      asyncValidators: [this.customAsyncValidator], // Async Validator
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

  // Asynchrone Validatoren
  customAsyncValidator(
    control: AbstractControl,
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      // Simuliere Server-Anfrage mit Verzögerung
      setTimeout(() => {
        if (control.value === 'Test Async') {
          resolve({ customAsync: true });
        } else {
          resolve(null);
        }
      }, 1000); // 1 Sekunde Verzögerung
    });
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
