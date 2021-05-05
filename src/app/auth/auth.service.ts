import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "../../environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  // diferencia con subject, tenemos acceso a los datos en cualquier momento, no solo cuando hay cambios
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        // adjust error to our message
        catchError(this.hanldeError),
        // tap allow us to execute code without modify response
        tap(({ email, localId, idToken, expiresIn }) => {
          this.handleAuthentication(email, localId, idToken, +expiresIn);
        })
      );
  }

  // login into firebase api
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        // adjust error to our message
        catchError(this.hanldeError),
        // tap allow us to execute code without modify response
        tap(({ email, localId, idToken, expiresIn }) => {
          this.handleAuthentication(email, localId, idToken, +expiresIn);
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    // getter to validate token and time
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["auth"]);
    localStorage.removeItem("userData");
    // remove autologout
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // method to hanlde our errors, private because only use internal
  private hanldeError(errorRes: HttpErrorResponse) {
    const strategicMessage = {
      EMAIL_EXISTS: "This email exists already",
      EMAIL_NOT_FOUND: "This email/password is not correct",
      INVALID_PASSWORD: "This email/password is not correct",
    };
    let errorMessage = strategicMessage[errorRes?.error?.error?.message]
      ? strategicMessage[errorRes?.error?.error?.message]
      : "An unknow error occurred!";
    return throwError(errorMessage);
  }

  // method to hanlde our user, private because only use internal
  // also we can redirect our router, in that example we do into component.ts
  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    // generate expiration date, as now in miliseconds + expiration in seconds
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    // provide time in miliseconds to settimeout
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
