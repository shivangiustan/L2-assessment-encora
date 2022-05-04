import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { take,exhaustMap,map, catchError, retry, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor() {}
 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
          Authorization: 'asjdpjas9d9a8sd-paodiasd8-0a9s-d09a09s-d09-0a9sd9a9sd-09a09sd0'
      })
    };
    // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return next.handle(request).pipe(
      catchError(this.handleError),
      finalize(() => {
        
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
