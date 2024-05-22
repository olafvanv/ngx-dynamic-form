import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldBaseComponent } from 'ngx-dynamic-form';
import { SliderInputControl } from './slider-input-control/slider-input-control.component';
import { SliderInput } from './slider-input.model';

@Component({
  selector: 'app-slider-input',
  templateUrl: 'slider-input.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SliderInputControl]
})
export class SliderInputComponent extends DynamicFormFieldBaseComponent {
  @Input() model!: SliderInput;
  @Input() group!: UntypedFormGroup;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
}
