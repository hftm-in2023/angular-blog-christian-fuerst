import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { blogDetailResolver } from './service/blog-detail-resolve/blog-detail-resolve.service';

export const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:id',
    resolve: { data: blogDetailResolver },
    loadComponent: () =>
      import('./blog-detail/blog-detail.component').then(
        (c) => c.BlogDetailComponent,
      ), 
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./calculator/calculator.component').then(
        (c) => c.CalculatorComponent,
      ), 
  },
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
