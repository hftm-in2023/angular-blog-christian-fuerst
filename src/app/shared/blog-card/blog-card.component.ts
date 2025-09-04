import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BlogEntryPreview } from '../../core/models/blog.models';

@Component({
  selector: 'app-blog-card',
  imports: [MatCardModule, MatButtonModule],
  styleUrl: './blog-card.component.scss',
  standalone: true,
  template: `
    @if (blogEntry(); as entry) {
      <mat-card class="blog-card" appearance="outlined" (click)="onClickBlogEntry()">
        <p>{{ entry.id }}</p>
        <mat-card-header>
          <mat-card-title>{{ entry.title }}</mat-card-title>
          <mat-card-subtitle>{{ entry.author }}</mat-card-subtitle>
        </mat-card-header>
        <img
          mat-card-image
          [src]="entry.headerImageUrl || 'images/pictureNotFound.jpg'"
          alt="Header Image"
        />
        <mat-card-content>
          <p>{{ entry.contentPreview }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>LIKE</button>
          <button mat-button>SHARE</button>
        </mat-card-actions>
      </mat-card>
    } @else {
      <p>Fehler beim Anzeigen der Blog Vorschau!</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCardComponent {
  blogEntry = input.required<BlogEntryPreview | null>();

  // KORREKTUR: Das Output-Signal wird umbenannt, um Konflikte zu vermeiden.
  entryClicked = output<number>();

  onClickBlogEntry() {
    const entry = this.blogEntry();
    if (entry?.id) {
      // Das 'emit' wird auf dem neuen Signal aufgerufen.
      this.entryClicked.emit(entry.id);
    }
  }
}
