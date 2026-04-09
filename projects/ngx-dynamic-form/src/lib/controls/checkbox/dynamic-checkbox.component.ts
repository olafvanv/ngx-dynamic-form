import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicCheckbox } from './dynamic-checkbox.model';

@Component({
  selector: 'dynamic-checkbox',
  templateUrl: 'dynamic-checkbox.component.html',
  imports: [ReactiveFormsModule, MatCheckboxModule]
})
export class DynamicCheckboxComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicCheckbox;
  @Input() group!: FormGroup;
}
