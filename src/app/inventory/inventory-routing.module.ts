import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard/auth-guard.service';
import { Role } from '../auth/role.enum';
import { CategoriesComponent } from './categories/categories.component';
import {
  InventoryDashboardComponent,
} from './inventory-dashboard/inventory-dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductsComponent } from './products/products.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: 'home',
        component: InventoryDashboardComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Clerk },
      },
      {
        path: 'stock',
        component: StockEntryComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Clerk },
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Clerk },
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuardService],
        data: { expectedRole: Role.Clerk },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
