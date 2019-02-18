import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/auth-guard/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  {
    path: 'manager',
    loadChildren: './manager/manager.module#ManagerModule',
    canLoad: [AuthGuardService],
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canLoad: [AuthGuardService],
  },
  {
    path: 'pos',
    loadChildren: './pos/pos.module#PosModule',
    canLoad: [AuthGuardService],
  },
  {
    path: 'inventory',
    loadChildren: './inventory/inventory.module#InventoryModule',
    canLoad: [AuthGuardService],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
