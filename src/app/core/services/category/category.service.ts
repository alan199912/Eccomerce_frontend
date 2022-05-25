import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category, CategoryResponse } from 'src/app/core/models/category.models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  public getCategoriesList(): Observable<CategoryResponse> {
    return this.http
      .get<CategoryResponse>(environment.category.getCategoriesList)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public getCategoriesListIncludeDeleted(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(environment.category.getCategoriesListIncludeDeleted).pipe(
      map((res) => res.categories),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http.get<CategoryResponse>(`${environment.category.getCategoryById}/${id}`).pipe(
      map((res) => res.category),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public setCategory(name: string): Observable<CategoryResponse> {
    return this.http
      .post<CategoryResponse>(environment.category.setCategory, name)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public updateCategory(name: string, id: string): Observable<CategoryResponse> {
    return this.http
      .put<CategoryResponse>(`${environment.category.updateCategory}/${id}`, name)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public deleteCategory(id: string): Observable<CategoryResponse> {
    return this.http
      .delete<CategoryResponse>(`${environment.category.deleteCategory}/${id}`)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public restoreCategory(id: string): Observable<CategoryResponse> {
    return this.http
      .post<CategoryResponse>(`${environment.category.restoreCategory}/${id}`, null)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
