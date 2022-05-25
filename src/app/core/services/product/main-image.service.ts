import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainImageService {
  constructor(private readonly http: HttpClient) {}

  public setMainImageProduct(product): Observable<any> {
    return this.http
      .post<any>(environment.product.mainImage.setMainImage, product, {
        headers: {
          enctype: 'multipart/form-data',
        },
      })
      .pipe(catchError((error) => throwError(() => error.message)));
  }
}
