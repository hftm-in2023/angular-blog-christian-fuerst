import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogEntry } from '../service/blog/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);

    blogId: string | null = null;
    blog: BlogEntry | null = null;

  ngOnInit(): void {
    this.blog = this.route.snapshot.data['data'];
  }
}
