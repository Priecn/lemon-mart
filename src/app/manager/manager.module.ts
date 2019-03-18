import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { SharedComponentModule } from '../shared-component/shared-component.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerMaterialModule } from './manager-material/manager-material.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserTableComponent } from './user-table/user-table.component';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    ManagerMaterialModule,
    SharedComponentModule,
  ],
})
export class ManagerModule {}
