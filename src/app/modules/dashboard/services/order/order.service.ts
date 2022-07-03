import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BodySetOrder, Order, ResponseOrder } from 'src/app/core/models/order.modules';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  public setOrder(order: BodySetOrder): Observable<ResponseOrder> {
    return this.http
      .post<ResponseOrder>(environment.order.setOrder, order)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public getOrdersByUserId(id: number): Observable<ResponseOrder> {
    return this.http
      .get<ResponseOrder>(`${environment.order.getOrdersByUserId}/${id}`)
      .pipe(catchError((error) => throwError(() => error.error.message)));
  }

  public getOrdersList(): Observable<Order[]> {
    return this.http.get<ResponseOrder>(environment.order.getOrdersList).pipe(
      map((res) => res.orders),
      catchError((error) => throwError(() => error.error.message))
    );
  }
}
