import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ViewUserComponent } from '../user/view-user/view-user.component';

@NgModule({
  declarations: [ViewUserComponent],
  imports: [CommonModule, ReactiveFormsModule, FlexLayoutModule, MaterialModule],
  exports: [ViewUserComponent],
})
export class SharedComponentModule {}
