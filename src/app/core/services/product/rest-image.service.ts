import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestImageService {
  constructor(private readonly http: HttpClient) {}

  public setRestImageProduct(product): Observable<any> {
    return this.http
      .post<any>(environment.product.restImage.setRestImage, product, {
        headers: {
          enctype: 'multipart/form-data',
        },
      })
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public updateRestImageProduct(product, id: number): Observable<any> {
    return this.http
      .put<any>(`${environment.product.restImage.updateRestImage}/${id}`, product, {
        headers: {
          enctype: 'multipart/form-data',
        },
      })
      .pipe(catchError((error) => throwError(() => error.message)));
  }
}
