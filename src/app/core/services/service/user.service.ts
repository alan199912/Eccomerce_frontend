import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseUser, User } from 'src/app/core/models/user.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  public getUsersList(): Observable<User[]> {
    return this.http.get<ResponseUser>(`${environment.user.getUserList}`).pipe(
      map((res) => {
        return res.users;
      }),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<ResponseUser>(`${environment.user.getUserById}/${id}`).pipe(
      map((res) => res.user),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public getAllDataUserById(id: number): Observable<User> {
    return this.http.get<ResponseUser>(`${environment.user.getAllDataUserById}/${id}`).pipe(
      map((res) => res.user),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public updateUser(id: number, user: User): Observable<ResponseUser> {
    return this.http
      .put<ResponseUser>(`${environment.user.updateUser}/${id}`, user)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public updateAllDataUser(id: number, user: User): Observable<ResponseUser> {
    return this.http
      .put<ResponseUser>(`${environment.user.updateAllDataUser}/${id}`, user)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public changePassword(id: number, password: string): Observable<ResponseUser> {
    return this.http
      .put<ResponseUser>(`${environment.user.changePasswordUser}/${id}`, { password })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public setUser(user: User): Observable<ResponseUser> {
    return this.http
      .post<ResponseUser>(`${environment.user.setUser}`, user)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }
}
