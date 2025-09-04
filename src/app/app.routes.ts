import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { BlogComponent } from './blog/blog.component'; // Wird nur bei Eager Loading benötigt
// import { BlogDetailComponent } from './blog-detail/blog-detail.component'; // Wird nur bei Eager Loading benötigt
// import { blogDetailResolver } from './core/service/blog-detail-resolve/blog-detail-resolve.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full',
  },
  {
    path: 'blog',
    // component: BlogComponent,
    loadComponent: () => import('./features/blog/blog.component').then((c) => c.BlogComponent), // Lazy Loading aktivieren
  },
  {
    path: 'blog/:id',
    // component: BlogDetailComponent, // Wird nicht mehr benötig, da dies Eager Loading ist.
    // resolve: { data: blogDetailResolver },
    loadComponent: () =>
      import('./features/blog-detail/blog-detail.component').then((c) => c.BlogDetailComponent), // Lazy Loading aktivieren
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
