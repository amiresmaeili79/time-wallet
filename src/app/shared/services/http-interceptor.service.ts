import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {LoadingPageService} from './loading-page.service';
import {catchError, finalize, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  exclude = [
    environment.auth,
    environment.user
  ];

  activeRequests: number;
  constructor(
    private authenticationService: UserService,
    private loadingPageService: LoadingPageService,
    private router: Router
  ) {
    this.activeRequests = 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.activeRequests === 0) {
      this.loadingPageService.setLoadingPage(true);
    }
    this.activeRequests++;
    if (this.authenticationService.getToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authenticationService.getToken()
        }
      });
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authenticationService.logOut();
          this.router.navigateByUrl('/login').then();
        }
        return throwError(error);
      }),
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingPageService.setLoadingPage(false);
        }
      }));
  }
}
