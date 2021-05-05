import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authSer: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // we have 2 observable user and http, we have to return only one with data from both
    // pipe with take, allow us to take 1 time the value and he is responsible to unsubcribe
    // exhaustMap allow us to merge, and return the second observer
    // our target is access to user info into http observer
    return this.authSer.user.pipe(
      take(1),
      exhaustMap((user) => {
        // alternative check url
        if (!user) {
          return next.handle(req);
        }
        // add our token to request
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
