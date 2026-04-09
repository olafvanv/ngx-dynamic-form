import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicCheckbox } from './dynamic-checkbox.model';

@Component({
  selector: 'dynamic-checkbox',
  templateUrl: 'dynamic-checkbox.component.html',
  imports: [ReactiveFormsModule, MatCheckboxModule]
})
export class DynamicCheckboxComponent extends DynamicFormFieldBase<DynamicCheckbox> {
  public model = input.required<DynamicCheckbox>();
  public group = input.required<FormGroup>();
}
