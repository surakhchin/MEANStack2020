import { Injectable } from '@angular/core';

import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";

import {DISHES} from "../shared/dishes";

import {delay, map, catchError} from "rxjs/operators";
import { Observable, of } from 'rxjs';
import {ProcessHTTPMsgService} from "./process-httpmsg.service";
import {HttpClient} from "@angular/common/http";
import {baseURL} from "../shared/baseurl";

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {

    return this.http.get<Leader[]>(baseURL + 'leadership')
        .pipe(catchError(this.processHTTPMsgService.handleError))

      // of(LEADERS).pipe(delay(2000));


    // return new Promise( resolve => {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(LEADERS), 2000);
    // });
    // return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Observable<Leader> {

    return of(LEADERS.filter( leader => (leader.id === id))[0]).pipe(delay(2000));


    // return new Promise( resolve => (
    //     // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(LEADERS.filter( (leader) => (leader.id === id))[0]), 2000)
    // ));
    // return Promise.resolve(LEADERS.filter( (leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Observable<Leader> {

    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
        .pipe(map(leaders => leaders[0])).pipe(catchError(this.processHTTPMsgService.handleError))

      // of(LEADERS.filter(leader => leader.featured)[0]).pipe(delay(2000));

    // return new Promise( resolve => {
    //   // Simulate server latency with 2 seconds delay
    //     setTimeout( () => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000)
    // });
    // return Promise.resolve(LEADERS.filter( (leader) => leader.featured)[0]);
  }


}
