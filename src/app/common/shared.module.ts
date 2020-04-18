import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { TableDialogComponent } from './table-dialog/table-dialog.component';


@NgModule({
  declarations: [
    ConfirmationComponent,
    TableDialogComponent
  ],
  entryComponents: [
    ConfirmationComponent,
    TableDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ConfirmationComponent, TableDialogComponent]
})
export class SharedModule { }
