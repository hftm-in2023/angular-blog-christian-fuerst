import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddBlogPageComponent } from './add-blog-page.component';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: AddBlogPageComponent,
    canActivate: [isAuthenticatedGuard], // zusätzlich abgesichert
  },
];

@NgModule({
  declarations: [AddBlogPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddBlogPageModule {}
