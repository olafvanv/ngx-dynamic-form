import { Inject, Injectable, Optional, Type } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup } from '@angular/forms';
import { DynamicFormField } from '../models/classes/dynamic-form-field-base';
import { DynamicFormFieldModel } from '../models/classes/dynamic-form-field-model';
import { DynamicFormFieldValueConfig } from '../models/classes/dynamic-form-field-value-model';
import { DYNAMIC_FORM_FIELD_MAP } from '../models/tokens/dynamic-form-field-map.token';
import { DynamicFormConfig } from '../models/types/dynamic-form-config.type';
import { TypedFormGroup } from '../models/types/form-group-model.type';
import { DynamicFormValidationsService } from './dynamic-validations.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  constructor(
    @Inject(DYNAMIC_FORM_FIELD_MAP) @Optional() private customMap: Record<string, Type<DynamicFormField>>,
    private fb: FormBuilder,
    private validatorsService: DynamicFormValidationsService
  ) {}

  /**
   * Check if there is a mapping provided to use custom form controls
   * @param model
   * @returns
   */
  public getCustomControlComponentType(model: DynamicFormFieldModel): Type<DynamicFormField<any>> | null {
    return this.customMap && this.customMap[model.type] ? this.customMap[model.type] : null;
  }

  /**
   * Create a FormGroup from the provided form configuration.
   * Returns a FormGroup.
   * @param {DynamicFormConfig} config Configuration object of a form
   * @returns {FormGroup}
   */
  public createFormGroup<T = any>(config: DynamicFormConfig): TypedFormGroup<T> {
    const group: FormGroup = this.fb.group({});

    config.forEach((controlConfig) => {
      const controlOptions: FormControlOptions = {
        updateOn: controlConfig.updateOn,
        validators: this.validatorsService.getValidatorFns(controlConfig.validators)
      };

      const controlValueConfig = controlConfig as DynamicFormFieldValueConfig<unknown>;
      const control = new FormControl(
        { value: controlValueConfig.value ?? controlValueConfig.defaultValue, disabled: controlValueConfig.disabled },
        controlOptions
      );

      group.addControl(controlConfig.name, control);
    });

    return group;
  }
}
