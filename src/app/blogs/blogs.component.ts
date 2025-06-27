import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';

import { BlogService } from './../service/blog.service';
import { Blog } from '../service/blog.service.interface'; // Importiere das Blog-Interface


// Angular Material Module
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    CommonModule,
    // <-- Alle benötigten Material Module hier importieren
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogs$!: Observable<Blog[]>;
  title = 'angular-blog-christian-fuerst';

  private blogService = inject(BlogService);
  
  ngOnInit(): void {
    this.blogs$ = this.blogService.getBlogs();
  }
}
