import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UiService } from 'src/app/common/ui.service';

import { AuthService, IAuthStatus } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus: IAuthStatus;
  constructor(
    private authService: AuthService,
    protected router: Router,
    private uiService: UiService
  ) {
    this.authService.authStatus.subscribe(
      authStatus => (this.currentAuthStatus = authStatus)
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(route);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin(childRoute);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }

  protected checkLogin(route?: ActivatedRouteSnapshot) {
    let roleMatch = true;
    let params: any;
    if (route) {
      const expectedRole = route.data.expectedRole;
      if (expectedRole) {
        roleMatch = this.currentAuthStatus.role === expectedRole;
      }
      if (roleMatch) {
        params = { redirectUrl: route.pathFromRoot.map(r => r.url).join('/') };
      }
    }
    if (!this.currentAuthStatus.isAuthenticated || !roleMatch) {
      this.showAlert(this.currentAuthStatus.isAuthenticated, roleMatch);
      this.router.navigate(['/home', params || {}]);
      return false;
    }
    return true;
  }

  private showAlert(isAuth: boolean, roleMatch: boolean) {
    if (!isAuth) {
      this.uiService.showToast('You must login to continue');
    }
    if (!roleMatch) {
      this.uiService.showToast('You do not have permission to view this resource');
    }
  }
}
