import { ValidatorFn } from '@angular/forms';

export interface DynamicFormValidator {
  name: string;
  validator: ValidatorFn;
  message?: string;
  enabled?: boolean;
}
