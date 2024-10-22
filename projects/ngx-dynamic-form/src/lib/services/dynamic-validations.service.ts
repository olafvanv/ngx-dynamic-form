import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { DynamicFormValidator } from '../models/interfaces/dynamic-form-validator.interface';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormValidationsService {
  /**
   * Get all Validator Functions from the validator configuration
   * @param validatorConfig
   * @returns
   */
  public getValidatorFns(validatorConfig: DynamicFormValidator[]): ValidatorFn[] {
    return validatorConfig.map((v) => v.validator);
  }

  /**
   * Update the validators on a FormControl based on the provided validator configuration.
   * This will replace any existing validators on the control or removes all validators when none provided
   * @param validatorConfig
   * @param control
   */
  public updateValidators(validatorConfig: DynamicFormValidator[], control: FormControl): void {
    if (!validatorConfig || validatorConfig.length === 0) {
      control.clearValidators();
    } else {
      const validatorFns: ValidatorFn[] = this.getValidatorFns(validatorConfig);
      control.setValidators(validatorFns);
    }

    control.updateValueAndValidity();
  }
}
