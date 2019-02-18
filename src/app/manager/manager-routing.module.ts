import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard/auth-guard.service';
import { Role } from '../auth/role.enum';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager/manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagementComponent } from './user-management/user-management.component';

const managerModuleRoutes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: 'home',
        component: ManagerHomeComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'users',
        component: UserManagementComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Manager },
      },
      {
        path: 'receipts',
        component: ReceiptLookupComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Manager },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(managerModuleRoutes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
