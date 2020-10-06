import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private matSnackBar: MatSnackBar) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    if (error.status === 401) {
                      this.router.navigateByUrl('/login').then();
                    }
                    return throwError(errorMsg);
                })
            );
    }
}
