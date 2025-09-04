import { inject, Injectable, signal } from '@angular/core';
import { Subject, of } from 'rxjs';
import { switchMap, catchError, map, filter, tap } from 'rxjs/operators';
import { BackendService } from '../service/backend/backend.service';
import { Action, BlogState } from './blog.state';
import * as BlogActions from './blog.state';

const initialState: BlogState = {
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class BlogStateService {
  private _state = signal<BlogState>(initialState);
  private action$ = new Subject<Action>();

  public blogs = () => this._state().blogs;
  public selectedBlog = () => this._state().selectedBlog;
  public loading = () => this._state().loading;
  public error = () => this._state().error;

  constructor() {
    const backendService = inject(BackendService);

    this.action$
      .pipe(
        tap((action) => console.log('Aktion:', action)),
        tap((action) => this._state.update((state) => this.reducer(state, action))),
      )
      .subscribe();

    this.action$
      .pipe(
        filter(
          (action): action is ReturnType<typeof BlogActions.loadBlogs> =>
            action.type === '[Blog] Load Blogs',
        ),
        switchMap(() =>
          backendService.getBlogs().pipe(
            map((blogs) => BlogActions.loadBlogsSuccess(blogs)),
            catchError((error) =>
              of(BlogActions.loadBlogsFailure(error.message || 'Unbekannter Fehler')),
            ),
          ),
        ),
      )
      .subscribe((action) => this.dispatch(action));

    this.action$
      .pipe(
        filter(
          (action): action is ReturnType<typeof BlogActions.loadBlogById> =>
            action.type === '[Blog] Load Blog By Id',
        ),
        switchMap((action) =>
          // KORREKTUR: Hier wird 'action.payload' direkt verwendet, da es die ID (number) ist.
          // Zuvor stand hier fälschlicherweise 'action.payload.id'.
          backendService.getBlogById(action.payload).pipe(
            map((blog) => BlogActions.loadBlogByIdSuccess(blog)),
            catchError((error) =>
              of(BlogActions.loadBlogByIdFailure(error.message || 'Unbekannter Fehler')),
            ),
          ),
        ),
      )
      .subscribe((action) => this.dispatch(action));
  }

  public dispatch(action: Action) {
    this.action$.next(action);
  }

  private reducer(state: BlogState, action: Action): BlogState {
    switch (action.type) {
      case '[Blog] Load Blogs':
      case '[Blog] Load Blog By Id':
        return { ...state, loading: true, error: null };
      case '[Blog] Load Blogs Success':
        return { ...state, blogs: action.payload, loading: false };
      case '[Blog] Load Blog By Id Success':
        return { ...state, selectedBlog: action.payload, loading: false };
      case '[Blog] Load Blogs Failure':
      case '[Blog] Load Blog By Id Failure':
        return { ...state, loading: false, error: action.payload };
      // NEUER REDUCER CASE
      case '[Blog] Clear Selected Blog':
        return { ...state, selectedBlog: null };
      default:
        return state;
    }
  }
}
