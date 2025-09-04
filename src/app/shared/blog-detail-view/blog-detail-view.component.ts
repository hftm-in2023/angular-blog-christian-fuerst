import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { BlogEntry } from '../../core/models/blog.models';

@Component({
  selector: 'app-blog-detail-view',
  imports: [NgIf, NgFor],
  standalone: true,
  template: `
    @if (blog(); as blogData) {
      <div class="blog-content">
        <div>
          <h1>{{ blogData.title }}</h1>
          <p>Blog Id: {{ blogData.id }}</p>
        </div>
        <p class="date">{{ blogData.createdAt }}</p>
        <p>{{ blogData.content }}</p>
        <div class="end">
          <p class="author">Author: {{ blogData.author }}</p>
          <div class="likes">
            <img src="images/like.png" alt="Likes" />
            <p>{{ blogData.likes }}</p>
          </div>
        </div>
      </div>
      <div class="comments">
        @for (comment of blogData.comments; track comment.id) {
          <div class="comment">
            <h2>{{ comment.author }}</h2>
            <p>Comment Id: {{ comment.id }}</p>
            <p>{{ comment.content }}</p>
          </div>
        }
      </div>
    } @else {
      <p>Kein Blog zum Anzeigen ausgewählt.</p>
    }
  `,
  styleUrl: './blog-detail-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailViewComponent {
  // input signal statt @Input
  blog = input<BlogEntry | null>();
}
