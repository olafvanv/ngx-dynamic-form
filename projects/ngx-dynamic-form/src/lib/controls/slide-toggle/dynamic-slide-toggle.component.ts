import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicSlideToggle } from './dynamic-slide-toggle.model';

@Component({
  selector: 'dynamic-slide-toggle',
  templateUrl: 'dynamic-slide-toggle.component.html',
  styleUrl: 'dynamic-slide-toggle.component.scss',
  imports: [ReactiveFormsModule, MatSlideToggleModule]
})
export class DynamicSlideToggleComponent extends DynamicFormFieldBase<DynamicSlideToggle> {
  public model = input.required<DynamicSlideToggle>();
  public group = input.required<FormGroup>();
}
