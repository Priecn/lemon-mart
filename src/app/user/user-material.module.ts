import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRadioModule, MatStepperModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatStepperModule, MatRadioModule],
  exports: [MatStepperModule, MatRadioModule],
})
export class UserMaterialModule {}
