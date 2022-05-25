import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Product, ProductResponse } from 'src/app/core/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public searchProductResult$ = new BehaviorSubject<Product[]>([]);
  constructor(private readonly http: HttpClient) {}

  public getProductList(): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(environment.product.productList)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getProductById(id: string): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${environment.product.getProductById}/${id}`)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getProductByCategoryId(id: number): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${environment.product.getProductByCategoryId}?categories=${id}`)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getFeaturedProducts(limit: string): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${environment.product.getFeaturedProducts}/${limit}`)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getFeaturedProductByCategoryId(id: number, limit: string): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${environment.product.getFeaturedProductByCategoryId}/${id}/${limit}`)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getLatestProductInEachCategoryByLimit(limit: string): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${environment.product.getLatestProductInEachCategoryByLimit}/${limit}`)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getProductsListSortBy(
    sortBy: string,
    page: number,
    limit: number
  ): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(
        `${environment.product.getProductsListSortBy}/${sortBy}?page=${page}&limit=${limit}`
      )
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getProductsListPagination(page: number, limit: number): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(
        `${environment.product.getProductsListPagination}?page=${page}&limit=${limit}`
      )
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getProductsByName(name: string): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${environment.product.getProductsByName}?name=${name}`)
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public getProductsListByCategoryIdPagination(
    id: number,
    page: number,
    limit: number
  ): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(
        `${environment.product.getProductsListByCategoryIdPagination}/${id}?page=${page}&limit=${limit}`
      )
      .pipe(catchError((error) => throwError(() => error.message)));
  }

  public setProduct(product: Product): Observable<ProductResponse> {
    return this.http
      .post<ProductResponse>(environment.product.setProduct, product, {
        headers: {
          enctype: 'multipart/form-data',
        },
      })
      .pipe(catchError((error) => throwError(() => error.message)));
  }
}
