import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicRadioGroup } from './dynamic-radio-group.model';

@Component({
  imports: [ReactiveFormsModule, MatRadioModule, AsyncPipe],
  selector: 'dynamic-radio-group',
  templateUrl: './dynamic-radio-group.component.html',
  styleUrls: ['./dynamic-radio-group.component.scss']
})
export class DymamicRadioGroupComponent extends DynamicFormFieldBase<DynamicRadioGroup> {
  public model = input.required<DynamicRadioGroup>();
  public group = input.required<FormGroup>();
}
