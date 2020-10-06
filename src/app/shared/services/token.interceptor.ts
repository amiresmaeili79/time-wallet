import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {environment} from '../../../environments/environment';
import {LoadingPageService} from './loading-page.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  exclude = [
    environment.auth,
    environment.user
  ];

  activeRequests: number;
  constructor(
    private authenticationService: UserService,
    private loadingPageService: LoadingPageService
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
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingPageService.setLoadingPage(false);
        }
      }));
  }
}
