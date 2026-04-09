import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicReadonly } from './dynamic-readonly.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'dynamic-readonly',
  templateUrl: './dynamic-readonly.component.html',
  styleUrls: ['./dynamic-readonly.component.scss']
})
export class DynamicReadonlyComponent extends DynamicFormFieldBase<DynamicReadonly> {
  public model = input.required<DynamicReadonly>();
  public group = input.required<FormGroup>();
}
