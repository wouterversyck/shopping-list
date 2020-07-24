import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }

          this.snackBarService.showMessage(errorMsg);
          return throwError(errorMsg);
        })
      );
  }
}
