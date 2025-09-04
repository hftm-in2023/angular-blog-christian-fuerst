import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogCardComponent } from '../../shared/blog-card/blog-card.component';
import { BlogStateService } from '../../core/state/blog.service';
import * as BlogActions from '../../core/state/blog.state';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [NgIf, NgFor, BlogCardComponent, LoadingSpinnerComponent],
  styleUrl: './blog.component.scss',
  standalone: true,
  template: `
    <h1>Blog Übersicht</h1>

    @if (state.loading()) {
      <app-loading-spinner></app-loading-spinner>
    } @else if (state.error()) {
      <p class="error">Ein Fehler ist aufgetreten: {{ state.error() }}</p>
    } @else {
      <div class="blog-container">
        @for (blog of state.blogs(); track blog.id) {
          <app-blog-card
            [blogEntry]="blog"
            (entryClicked)="handleClickOnBlogEntry($event)"
          ></app-blog-card>
        } @empty {
          <p>Keine Blogeinträge vorhanden.</p>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  public state = inject(BlogStateService);
  private router = inject(Router);

  ngOnInit() {
    this.state.dispatch(BlogActions.loadBlogs());
  }

  handleClickOnBlogEntry(entryId: number) {
    this.router.navigate(['/blog/', entryId]);
  }
}
