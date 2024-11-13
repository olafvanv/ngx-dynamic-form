import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldModel } from '../classes/dynamic-form-field-model';

export interface DynamicFormFieldEvent {
  event: unknown;
  control: UntypedFormControl;
  form: UntypedFormGroup;
  model: DynamicFormFieldModel;
  type: DynamicFormFieldEventType;
}

export type DynamicFormFieldEventType = 'change' | 'blur' | 'focus';
