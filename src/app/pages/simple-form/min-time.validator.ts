import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DynamicFormValidator } from 'ngx-dynamic-form';

function minTimeValidatorFn(minTime: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputTime = control.value as string;

    if (!inputTime) return null;

    const minTimeObj = new Date(`2000-01-01T${minTime}`);
    const inputTimeObj = new Date(`2000-01-01T${inputTime}`);

    return inputTimeObj >= minTimeObj ? null : { minTime: true };
  };
}

export const minTimeValidator: (minTime: string, msg?: string) => DynamicFormValidator = (minTime: string, msg?: string) => ({
  name: 'minTime',
  validator: minTimeValidatorFn(minTime),
  message: msg ?? `Minimale tijd is ${minTime}`
});
