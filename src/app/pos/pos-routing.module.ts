import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard/auth-guard.service';
import { Role } from '../auth/role.enum';
import { PosComponent } from './pos/pos.component';

const routes: Routes = [
  {
    path: '',
    component: PosComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: Role.Cashier },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
