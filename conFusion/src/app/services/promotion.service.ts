import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {LEADERS} from "../shared/leaders";
import {DISHES} from "../shared/dishes";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions(): Observable<Promotion[]> {

    return of(PROMOTIONS).pipe(delay(2000));

    // return new Promise(resolve => {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(PROMOTIONS), 2000);
    // });
  }

  getPromotion(id: string): Observable<Promotion> {

    return of(PROMOTIONS.filter( promotion => (promotion.id === id))[0]).pipe(delay(2000));

    // return new Promise( resolve => (
    //     //Simulate server latency with 2 second delay
    //     setTimeout( () => resolve(PROMOTIONS.filter((promo) => promo.id === id)[0]), 2000)
    // ));
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  }

  getFeaturedPromotion(): Observable<Promotion> {

    return of(PROMOTIONS.filter(promotion => promotion.featured)[0]).pipe(delay(2000));

    // return new Promise( resolve => (
    //     //Simulate server latency with 2 second delay
    //     setTimeout( () => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]),2000)
    // ));
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }

  constructor() { }
}
