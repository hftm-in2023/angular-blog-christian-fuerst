import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from 'rxjs';
import { Blog, ApiResponse } from './blog.service.interface'; // Annahme: Pfad zur Interface-Datei


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private http = inject(HttpClient);

  getBlogs(): Observable<Blog[]> {
    return this.http.get<ApiResponse>("./api/entries").pipe(
      map(response => response.data)
    );
  }
}
