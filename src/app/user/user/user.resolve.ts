import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from './user';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IUser | Observable<IUser> | Promise<IUser> {
    return this.userService.getUser(route.paramMap.get('username'));
  }
}
