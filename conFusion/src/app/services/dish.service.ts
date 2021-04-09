import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

// declare var HttpHeaders: any;


@Injectable({
  providedIn: 'root'
})
export class DishService {

  private _headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  // Basic way to use a Promise to instantly Resolve DISHES
  // getDishes(): Promise<Dish[]> {
  //   return Promise.resolve(DISHES);
  // }

  // A more realistic way of using a Promise to simulate a 2 sec delay and then Resolve DISHES
  // getDishes(): Promise<Dish[]> {
  //   return new Promise((resolve, reject) => {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES), 2000)
  //   });
  // }

  // Here we use the Observable pattern in services at first but then convert to Promises so Components can use the Promise
  // getDishes(): Promise<Dish[]> {
  //   return of(DISHES).pipe(delay(2000)).toPromise();
  // }

  // Here we want to directly operate with observables and subsrcribe to them in the component.
  // getDishes(): Observable<Dish[]> {
  //   return of(DISHES).pipe(delay(2000));
  // }

  // getDish(id: string): Promise<Dish> {
  //   return new Promise((resolve, reject)=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  //   });
  // }
  //
  // getFeaturedDish(): Promise<Dish> {
  //   return  new Promise(resolve=> {
  //     // Simulate server latency with 2 second delay
  //       setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
  //   });
  // }


//here we use http and rest from our local json-server

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  putDish(dish: Dish): Observable<Dish> {


    // const headers = this._headers.append('foo', 'bar');

    const httpOptions = {
      headers: this._headers
    };

    console.log(baseURL)


    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }



}
