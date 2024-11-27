
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormFieldBase, DynamicFormFieldEvent } from 'ngx-dynamic-form';
import { SliderInputControl } from './slider-input-control/slider-input-control.component';
import { SliderInput } from './slider-input.model';

@Component({
  selector: 'app-slider-input',
  templateUrl: 'slider-input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, SliderInputControl, MatFormFieldModule]
})
export class SliderInputComponent extends DynamicFormFieldBase {
  @Input() model!: SliderInput;
  @Input() group!: UntypedFormGroup;

  @Output() change: EventEmitter<DynamicFormFieldEvent> = new EventEmitter();

  public onChange(event: Event | DynamicFormFieldEvent): void {
    // Ignore the native HTML 5 change event
    if (event instanceof Event) {
      event.stopPropagation();
    }

    this.change.emit(event as DynamicFormFieldEvent);
  }
}
