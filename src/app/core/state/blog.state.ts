import { BlogEntry, BlogEntryPreview } from '../models/blog.models';

// State-Struktur
export interface BlogState {
  blogs: BlogEntryPreview[];
  selectedBlog: BlogEntry | null;
  loading: boolean;
  error: string | null;
}

// Action Creators
export const loadBlogs = () => ({ type: '[Blog] Load Blogs' }) as const;
export const loadBlogsSuccess = (blogs: BlogEntryPreview[]) =>
  ({ type: '[Blog] Load Blogs Success', payload: blogs }) as const;
export const loadBlogsFailure = (error: string) =>
  ({ type: '[Blog] Load Blogs Failure', payload: error }) as const;

export const loadBlogById = (id: number) =>
  ({ type: '[Blog] Load Blog By Id', payload: id }) as const;
export const loadBlogByIdSuccess = (blog: BlogEntry) =>
  ({ type: '[Blog] Load Blog By Id Success', payload: blog }) as const;
export const loadBlogByIdFailure = (error: string) =>
  ({ type: '[Blog] Load Blog By Id Failure', payload: error }) as const;

// NEUE AKTION: Setzt den ausgewählten Blog im State zurück.
export const clearSelectedBlog = () => ({ type: '[Blog] Clear Selected Blog' }) as const;

// Union-Type für alle Aktionen
export type Action =
  | ReturnType<typeof loadBlogs>
  | ReturnType<typeof loadBlogsSuccess>
  | ReturnType<typeof loadBlogsFailure>
  | ReturnType<typeof loadBlogById>
  | ReturnType<typeof loadBlogByIdSuccess>
  | ReturnType<typeof loadBlogByIdFailure>
  | ReturnType<typeof clearSelectedBlog>;
