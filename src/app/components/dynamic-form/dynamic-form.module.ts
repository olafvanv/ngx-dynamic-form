import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [CommonModule, DynamicFormModule],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
