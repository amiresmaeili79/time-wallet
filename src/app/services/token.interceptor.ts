import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  exclude = [
    environment.auth,
    environment.user
  ];

  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.exclude.includes(req.url)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.getToken()}`
        }
      });
    }
    return next.handle(req);
  }
}
