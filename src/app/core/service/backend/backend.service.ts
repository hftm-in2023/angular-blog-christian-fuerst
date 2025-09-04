import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogEntry, BlogEntryPreview } from '../../models/blog.models';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private http = inject(HttpClient);
  // Korrekte API-URL aus dem alten blog.service.ts
  private apiUrl =
    'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/entries';

  getBlogs(): Observable<BlogEntryPreview[]> {
    // API-Antwort hat die Struktur { data: [...] }, daher wird sie hier entpackt
    return this.http
      .get<{ data: BlogEntryPreview[] }>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  getBlogById(id: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>(`${this.apiUrl}/${id}`);
  }
}
