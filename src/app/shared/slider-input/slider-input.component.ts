import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormFieldBase } from 'ngx-dynamic-form';
import { SliderInputControl } from './slider-input-control/slider-input-control.component';
import { SliderInput } from './slider-input.model';

@Component({
  selector: 'app-slider-input',
  templateUrl: 'slider-input.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SliderInputControl, MatFormFieldModule]
})
export class SliderInputComponent extends DynamicFormFieldBase {
  @Input() model!: SliderInput;
  @Input() group!: UntypedFormGroup;

  @Output() change: EventEmitter<number> = new EventEmitter();
}
