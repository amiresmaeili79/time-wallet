import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from './user.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private matSnackBar: MatSnackBar,
                private userService: UserService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do stuff with response
                    }
                },
                (err: any) => {

                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {

                            this.userService.logOut();
                            this.router.navigate(['/login']);
                        }
                    }
                }
            ));
    }
}
