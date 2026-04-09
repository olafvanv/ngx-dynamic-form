import { ValidatorFn } from '@angular/forms';

export type DynamicFormValidator = {
  name: string;
  validator: ValidatorFn;
  message?: string;
};
