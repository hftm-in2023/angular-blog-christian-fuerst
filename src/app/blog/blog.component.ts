import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { BlogService } from '../service/blog/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule, RouterLink, MatCardModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']  
})
export class BlogComponent implements OnInit {
  blogService = inject(BlogService);
  title = 'Blog';

  ngOnInit() {
    this.blogService.loadBlogs();
  }

  get blogs() {
    return this.blogService.blogEntries();
  }

  get isLoading() {
    return this.blogService.loading();
  }
}
