import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/blog',
    pathMatch: 'full',
  },

  {
    path: 'blog',
    loadComponent: () => 
      import('./features/blog/blog.component').then((c) => c.BlogComponent), // Lazy Loading aktivieren
  },

  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./features/blog-detail/blog-detail.component').then((c) => c.BlogDetailComponent), // Lazy Loading aktivieren
  },

  {
    path: 'add-blog',
    canActivate: [isAuthenticatedGuard], // Top-Level Guard
    loadChildren: () =>
      import('./features/add-blog-page/add-blog-page.module').then((m) => m.AddBlogPageModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
