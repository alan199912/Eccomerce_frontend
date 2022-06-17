import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import {
  ResponseAuth,
  ResponseId,
  UserEmailRecoveryPassword,
  UserLogin,
  UserRegisterForm,
  UserRestorePassword,
} from 'src/app/core/models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  public register(user: UserRegisterForm): Observable<ResponseAuth> {
    return this.http
      .post<ResponseAuth>(environment.auth.register, user)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public login(user: UserLogin): Observable<ResponseAuth> {
    return this.http
      .post<ResponseAuth>(environment.auth.login, user)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public recoveryPassword(email: UserEmailRecoveryPassword): Observable<ResponseAuth> {
    return this.http
      .post<ResponseAuth>(environment.auth.recoveryPassword, email)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public restorePassword(password: UserRestorePassword, encodeToken: string): Observable<ResponseAuth> {
    return this.http
      .put<ResponseAuth>(`${environment.auth.restorePassword}/${encodeToken}`, { password })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public getIdByToken(): Observable<number> {
    return this.http.get<ResponseId>(environment.auth.getIdByToken).pipe(
      map(({ id }) => id),
      catchError((error) => throwError(() => error.error.message))
    );
  }

  public verifyToken(): Observable<any> {
    return this.http.get(environment.auth.verifyAuth).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public verifyAdminToken(): Observable<any> {
    return this.http.get(environment.auth.verifyAdminAuth).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  public verifyEncodeToken(encodeToken: string): Observable<ResponseAuth> {
    return this.http
      .post<ResponseAuth>(environment.auth.verifyEncodeToken, { encodeToken })
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public logOut(): void {
    localStorage.clear();
  }
}
