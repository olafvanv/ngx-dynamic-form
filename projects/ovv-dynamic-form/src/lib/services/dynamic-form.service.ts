import { Inject, Injectable, InjectionToken, Optional, Type } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlOptions, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldModel, DynamicFormFieldValueConfig } from '../models/dynamic-form-field-model.model';
import { DynamicFormField } from '../models/dynamic-form-field.model';
import { DynamicFormConfig } from '../models/types/dynamic-form-config.type';

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
    return typeof this.DYNAMIC_FORM_FIELD_TYPE_MAP_FN === 'function' ? this.DYNAMIC_FORM_FIELD_TYPE_MAP_FN(model) : null;
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
        const controlOptions: FormControlOptions = {};

        controls[controlValueConfig.name] = new UntypedFormControl(controlValueConfig.value, controlOptions);
      });
    });
    return new UntypedFormGroup(controls);
  }
}
