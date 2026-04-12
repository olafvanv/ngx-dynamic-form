import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicStaticText } from './dynamic-static-text.model';

@Component({
  selector: 'dynamic-static-text',
  templateUrl: 'dynamic-static-text.component.html',
  styleUrl: './dynamic-static-text.component.scss',
  imports: [ReactiveFormsModule]
})
export class DynamicStaticTextComponent extends DynamicFormFieldBase<DynamicStaticText> {
  public model = input.required<DynamicStaticText>();
  public group = input.required<FormGroup>();
}
