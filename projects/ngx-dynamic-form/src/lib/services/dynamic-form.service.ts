import { Inject, Injectable, Optional, Type } from '@angular/core';
import { FormBuilder, FormControlOptions, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldModel } from '../models/classes/dynamic-form-field-model';
import { DynamicFormFieldValueConfig } from '../models/interfaces/dynamic-form-field-value-config.interface';
import { DynamicFormField } from '../models/interfaces/dynamic-form-field.interface';
import { DYNAMIC_FORM_FIELD_MAP_FN } from '../models/tokens/dynamic-form-field-map-fn.token';
import { DynamicFormConfig } from '../models/types/dynamic-form-config.type';
import { isFunction } from '../utils/methods.util';
import { DynamicFormValidationsService } from './dynamic-validations.service';

export type DynamicFormFieldTypeMapFn = (field: DynamicFormFieldModel) => Type<DynamicFormField> | null;

@Injectable()
export class DynamicFormService {
  constructor(
    @Inject(DYNAMIC_FORM_FIELD_MAP_FN) @Optional() private DYNAMIC_FORM_FIELD_MAP_FN: DynamicFormFieldTypeMapFn,
    private fb: FormBuilder,
    private validatorsService: DynamicFormValidationsService
  ) {}

  /**
   * Check if there is a function provided to use custom form controls
   * @param model
   * @returns
   */
  public getCustomControlComponentType(model: DynamicFormFieldModel): Type<DynamicFormField> | null {
    return isFunction(this.DYNAMIC_FORM_FIELD_MAP_FN) ? this.DYNAMIC_FORM_FIELD_MAP_FN(model) : null;
  }

  /**
   * Create a FormGroup from the provided form configuration
   * @param config
   * @returns
   */
  public createFormGroup(config: DynamicFormConfig): UntypedFormGroup {
    const group: UntypedFormGroup = this.fb.group({});

    config.forEach((row) => {
      row.forEach((controlConfig) => {
        const controlValueConfig = controlConfig as DynamicFormFieldValueConfig<unknown>;
        const controlOptions: FormControlOptions = {
          updateOn: controlConfig.updateOn,
          validators: this.validatorsService.getValidatorFns(controlConfig.validators)
        };

        const control = new UntypedFormControl(
          { value: controlValueConfig.value ?? controlValueConfig.defaultValue, disabled: controlValueConfig.disabled },
          controlOptions
        );

        group.addControl(controlConfig.name, control);
      });
    });

    return group;
  }
}
