import { Injectable } from '@angular/core';

import {Feedback} from "../shared/feedback";

import { Observable, of } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {Dish} from "../shared/dish";


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private _headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService)
  { }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseURL + 'feedback')
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  postFeedback(feedback: Feedback): Observable<Feedback> {

    const httpOptions = {
      headers: this._headers
    };

    return this.http.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
