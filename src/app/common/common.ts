import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Role } from '../auth/role.enum';

export function transformError(error: HttpErrorResponse | string) {
  let errorMessage = 'An unknown error has occured';
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error! ${error.error.message}`;
  } else if (error.status) {
    errorMessage = `Request failed with ${error.status} ${error.statusText}`;
  }
  return throwError(errorMessage);
}

export function setRole(authority: string): Role {
  if (authority.toUpperCase() === 'ROLE_USER') {
    return Role.User;
  }
  if (authority.toUpperCase() === 'ROLE_MANAGER') {
    return Role.Manager;
  }
  if (authority.toUpperCase() === 'ROLE_CASHIER') {
    return Role.Cashier;
  }
  if (authority.toUpperCase() === 'ROLE_CLERK') {
    return Role.Clerk;
  }
  return Role.None;
}
