import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormFieldBase } from 'ngx-dynamic-form';
import { SliderInputControl } from './slider-input-control/slider-input-control.component';
import { SliderInput } from './slider-input.model';

@Component({
  selector: 'app-slider-input',
  templateUrl: 'slider-input.component.html',
  imports: [ReactiveFormsModule, SliderInputControl, MatFormFieldModule]
})
export class SliderInputComponent extends DynamicFormFieldBase {
  @Input() model!: SliderInput;
  @Input() group!: FormGroup;
}
