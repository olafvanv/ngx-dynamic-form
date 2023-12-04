import { EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldModel } from '../dynamic-form-field.model';

export interface DynamicFormField {
  group: UntypedFormGroup;
  model: DynamicFormFieldModel;
  blur: EventEmitter<any>;
  change: EventEmitter<any>;
  focus: EventEmitter<any>;
}
