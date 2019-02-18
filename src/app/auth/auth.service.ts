import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { transformError } from '../common/common';

// Interfaces used for Auth

export interface IAuthStatus {
  isAuthenticated: boolean;
  AUTHORITIES: string[];
  sub: string;
  iat: number;
  exp: number;
}

interface IServerAuthResponse {
  token: string;
}

const defaultAuthStatus = {
  isAuthenticated: false,
  AUTHORITIES: null,
  sub: null,
  iat: null,
  exp: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authStatus = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);

  public authProvider: any;

  constructor(private http: HttpClient) {
    this.authProvider = this.httpAuthProvider;
  }

  private httpAuthProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.http.post<IServerAuthResponse>(`${environment.baseUrl}/v1/login`, {
      email,
      password,
    });
  }

  public login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();

    const loginResponse = this.authProvider(email, password).pipe(
      tap((value: IServerAuthResponse) => console.log(decode(value.token))),
      map((value: IServerAuthResponse) => decode(value.token) as IAuthStatus),
      tap((value: IAuthStatus) => (value.isAuthenticated = true)),
      catchError(transformError)
    );

    loginResponse.subscribe(
      res => this.authStatus.next(res),
      err => {
        this.logout();
        throwError(err);
      }
    );
    return loginResponse;
  }

  public logout() {
    this.authStatus.next(defaultAuthStatus);
  }
}
