import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService, IAuthStatus } from 'src/app/auth/auth.service';
import { CacheService } from 'src/app/auth/cache/cache.service';
import { setRole, transformError } from 'src/app/common/common';
import { environment } from 'src/environments/environment';
import { IUser, User } from './user';

export interface IUsers {
  items: IUser[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class UserService extends CacheService {
  currentUser = new BehaviorSubject<IUser>(this.getItem<IUser>('user') || new User());
  private currentAuthStatus: IAuthStatus;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
    this.currentUser.subscribe(user => this.setItem('user', user));
    this.authService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = authStatus)
    );
  }

  getCurrentUser(): Observable<IUser> {
    const userObservble = this.getUser(this.currentAuthStatus.sub).pipe(
      tap(user => {
        user.role = setRole(user.authorities[0]);
      }),
      catchError(transformError)
    );
    userObservble.subscribe(
      user => {
        this.currentUser.next(user);
      },
      err => {
        throwError(err);
      }
    );
    return userObservble;
  }

  getUser(username: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.baseUrl}/v1/user/${username}`);
  }

  getUsers(pageSize: number, searchText = '', pagesToSkip = 0): Observable<IUsers> {
    return this.httpClient
      .get<IUsers>(`${environment.baseUrl}/v1/users`, {
        params: {
          search: searchText,
          offset: pagesToSkip.toString(),
          limit: pageSize.toString(),
        },
      })
      .pipe(
        tap(users => {
          users.items.forEach(user => (user.role = setRole(user.authorities[0])));
        })
      );
  }

  updateUser(user: IUser): Observable<IUser> {
    this.setItem('draft-user', user);
    user.authorities[0] = 'ROLE_' + user.role.toString().toUpperCase();
    const updateResponse = this.httpClient
      .put<IUser>(`${environment.baseUrl}/v1/user/${user.username}`, user)
      .pipe(
        tap((updatedUser: IUser) => {
          updatedUser.role = setRole(updatedUser.authorities[0]);
        }),
        catchError(transformError)
      );
    updateResponse.subscribe(
      res => {
        this.currentUser.next(res);
        this.removeItem('draft-user');
      },
      err => throwError(err)
    );
    return updateResponse;
  }

  addUser(user: IUser): Observable<IUser> {
    this.setItem('draft-user', user);
    const addResponse = this.httpClient
      .post<IUser>(`${environment.baseUrl}/v1/user`, user)
      .pipe(
        tap((addedUser: IUser) => {
          addedUser.role = setRole(addedUser.authorities[0]);
        }),
        catchError(transformError)
      );
    addResponse.subscribe(
      res => {
        this.currentUser.next(res);
        this.removeItem('draft-user');
      },
      err => throwError(err)
    );
    return addResponse;
  }
}
