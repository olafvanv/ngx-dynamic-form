import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldModel } from '../classes/dynamic-form-field-model';

export interface DynamicFormFieldEvent {
  event: unknown;
  control: FormControl;
  form: FormGroup;
  model: DynamicFormFieldModel;
  type: DynamicFormFieldEventType;
}

export type DynamicFormFieldEventType = 'change' | 'blur' | 'focus';
