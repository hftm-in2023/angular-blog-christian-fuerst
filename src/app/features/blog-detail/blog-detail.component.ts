import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core'; // OnDestroy hinzugefügt
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogDetailViewComponent } from '../../shared/blog-detail-view/blog-detail-view.component';
import { BlogStateService } from '../../core/state/blog.service';
import * as BlogActions from '../../core/state/blog.state';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [NgIf, RouterLink, BlogDetailViewComponent, LoadingSpinnerComponent],
  template: `
    <div class="blog-detail">
      @if (state.selectedBlog(); as blog) {
        <app-blog-detail-view [blog]="blog"></app-blog-detail-view>
      } @else {
        @if (state.loading()) {
          <app-loading-spinner></app-loading-spinner>
        } @else if (state.error()) {
          <p class="error">Ein Fehler ist aufgetreten: {{ state.error() }}</p>
        } @else {
          <!-- Dieser Text wird jetzt nur noch angezeigt, wenn wirklich nichts geladen wird. -->
        }
      }
      <div class="back">
        <button [routerLink]="['/blog']">Zurück</button>
      </div>
    </div>
  `,
  styleUrl: './blog-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// OnDestroy implementiert, um den State aufzuräumen
export class BlogDetailComponent implements OnInit, OnDestroy {
  public state = inject(BlogStateService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const blogIdStr = this.route.snapshot.paramMap.get('id');
    if (blogIdStr) {
      const blogId = parseInt(blogIdStr, 10);
      this.state.dispatch(BlogActions.loadBlogById(blogId));
    }
  }

  // NEUE METHODE: Wird aufgerufen, wenn die Komponente verlassen wird.
  ngOnDestroy(): void {
    // Setzt den ausgewählten Blog zurück. Das verhindert, dass beim Navigieren
    // zu einem neuen Blog kurz der Inhalt des alten angezeigt wird.
    this.state.dispatch(BlogActions.clearSelectedBlog());
  }
}
