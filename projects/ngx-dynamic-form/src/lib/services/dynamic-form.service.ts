import { Inject, Injectable, InjectionToken, Optional, Type } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlOptions, UntypedFormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { DynamicFormFieldModel } from '../models/dynamic-form-field.model';
import { DynamicFormFieldValueConfig } from '../models/interfaces/dynamic-form-field-value-config.interface';
import { DynamicFormField } from '../models/interfaces/dynamic-form-field.interface';
import { DynamicFormValidator } from '../models/interfaces/dynamic-form-validator.interface';
import { DynamicFormConfig } from '../models/types/dynamic-form-config.type';
import { isFunction } from '../utils/methods.util';

export type DynamicFormFieldTypeMapFn = (field: DynamicFormFieldModel) => Type<DynamicFormField> | null;

export const DYNAMIC_FORM_FIELD_TYPE_MAP_FN = new InjectionToken('DYNAMIC_FORM_FIELD_TYPE_MAP_FN');

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  constructor(
    private fb: FormBuilder,
    @Inject(DYNAMIC_FORM_FIELD_TYPE_MAP_FN) @Optional() private DYNAMIC_FORM_FIELD_TYPE_MAP_FN: DynamicFormFieldTypeMapFn
  ) {}

  /**
   * Check if there is a function provided to use custom form controls
   * @param model
   * @returns
   */
  public getCustomComponentType(model: DynamicFormFieldModel): Type<DynamicFormField> | null {
    return isFunction(this.DYNAMIC_FORM_FIELD_TYPE_MAP_FN) ? this.DYNAMIC_FORM_FIELD_TYPE_MAP_FN(model) : null;
  }

  /**
   * Create a FormGroup from the provided form configuration
   * @param config
   * @returns
   */
  public createFormGroup(config: DynamicFormConfig): UntypedFormGroup {
    const controls: { [control: string]: AbstractControl } = {};

    config.forEach((row) => {
      row.forEach((controlConfig) => {
        const controlValueConfig = controlConfig as DynamicFormFieldValueConfig<unknown>;
        const controlOptions: FormControlOptions = {
          updateOn: controlConfig.updateOn,
          validators: this.getValidators(controlConfig.validators)
        };

        console.log(controlConfig);

        controls[controlValueConfig.name] = new UntypedFormControl(controlValueConfig.value, controlOptions);
      });
    });

    return new UntypedFormGroup(controls);
  }

  private getValidators(validators: DynamicFormValidator[]): ValidatorFn[] {
    return validators.map((m) => {
      return m.validator;
    });
  }
}
