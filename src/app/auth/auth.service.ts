import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setRole, transformError } from '../common/common';
import { CacheService } from './cache/cache.service';
import { Role } from './role.enum';

// Interfaces used for Auth

export interface IAuthStatus {
  isAuthenticated: boolean;
  AUTHORITIES: string[];
  role: Role;
  sub: string;
  iat: number;
  exp: number;
}

export interface IServerAuthResponse {
  token: string;
}

const defaultAuthStatus = {
  isAuthenticated: false,
  AUTHORITIES: null,
  role: Role.None,
  sub: null,
  iat: null,
  exp: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CacheService {
  public authStatus = new BehaviorSubject<IAuthStatus>(defaultAuthStatus);

  public authProvider: any;

  constructor(private http: HttpClient) {
    super();
    this.authProvider = this.httpAuthProvider;
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus));
  }

  private httpAuthProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.http.post<IServerAuthResponse>(`${environment.authUrl}/v1/login`, {
      email,
      password,
    });
  }

  public login(email: string, password: string): Observable<IAuthStatus> {
    this.logout();

    const loginResponse = this.authProvider(email, password).pipe(
      map((value: IServerAuthResponse) => {
        this.setToken(value);
        return decode(value.token) as IAuthStatus;
      }),
      tap((value: IAuthStatus) => {
        value.isAuthenticated = true;
        value.role = setRole(value.AUTHORITIES[0]);
      }),
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
    this.clearToken();
    this.authStatus.next(defaultAuthStatus);
  }

  private setToken(jwt: IServerAuthResponse) {
    this.setItem('jwt', jwt);
  }

  private getDecodedToken(): IAuthStatus {
    return decode(this.getItem('jwt'));
  }

  getToken(): string {
    return this.getItem<IServerAuthResponse>('jwt')
      ? this.getItem<IServerAuthResponse>('jwt').token
      : '';
  }

  private clearToken() {
    this.removeItem('jwt');
  }
}
