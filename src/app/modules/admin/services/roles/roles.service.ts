import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Role, roleResponse } from '../../../../core/models/role.models';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private readonly http: HttpClient) {}

  public getRolesList(): Observable<Role[]> {
    return this.http.get<roleResponse>(environment.role.getRolesList).pipe(
      map((res) => res.roles),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public getRolesListEnabled(): Observable<Role[]> {
    return this.http.get<roleResponse>(environment.role.getRolesListEnabled).pipe(
      map((res) => res.roles),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public getRoleById(id: string): Observable<Role> {
    return this.http.get<roleResponse>(`${environment.role.getRoleById}/${id}`).pipe(
      map((res) => res.role),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public setRole(name: string): Observable<roleResponse> {
    return this.http
      .post<roleResponse>(environment.role.setRole, name)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public updateRole(name: string, id: string): Observable<roleResponse> {
    return this.http
      .put<roleResponse>(`${environment.role.updateRole}/${id}`, name)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public deleteRole(id: string): Observable<roleResponse> {
    return this.http
      .delete<roleResponse>(`${environment.role.deleteRole}/${id}`)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public restoreRole(id: string): Observable<roleResponse> {
    return this.http
      .post<roleResponse>(`${environment.role.restoreRole}/${id}`, null)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
