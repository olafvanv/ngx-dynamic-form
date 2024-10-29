import { Inject, Injectable, Optional, Type } from '@angular/core';
import { FormBuilder, FormControlOptions, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { DynamicFormField } from '../models/classes/dynamic-form-field-base-component';
import { DynamicFormFieldModel } from '../models/classes/dynamic-form-field-model';
import { DynamicFormFieldOption } from '../models/classes/dynamic-form-field-option-model';
import { DynamicFormFieldValueConfig } from '../models/classes/dynamic-form-field-value-model';
import { DYNAMIC_FORM_FIELD_MAP_FN } from '../models/tokens/dynamic-form-field-map-fn.token';
import { DynamicFormConfig } from '../models/types/dynamic-form-config.type';
import { DynamicFormValidationsService } from './dynamic-validations.service';

export type DynamicFormFieldTypeMapFn = (field: DynamicFormFieldModel) => Type<DynamicFormField> | null;

@Injectable({
  providedIn: 'root'
})
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
    return typeof this.DYNAMIC_FORM_FIELD_MAP_FN === 'function' ? this.DYNAMIC_FORM_FIELD_MAP_FN(model) : null;
  }

  /**
   * Create a FormGroup from the provided form configuration.
   * Returns a FormGroup.
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

  /**
   * Transform any list (Observable) to a list of DynamicFormFieldOption which is used in any Dynamic Form Field with options (e.g. DynamicSelect).
   * Generic types:
   * T = The type of the items in the provided list
   * K = The type of the value inside an DynamicFormFieldOption
   * @param listObs
   * @param labelCb
   * @param valueCb
   * @returns
   */
  public toDynamicOptionListObs<T, K = string>(
    listObs: Observable<T[]>,
    labelCb: (item: T) => string,
    valueCb: (item: T) => K
  ): Observable<DynamicFormFieldOption<K>[]> {
    return listObs.pipe(
      map((list) => {
        return list.map((item) => {
          return {
            label: labelCb(item),
            value: valueCb(item)
          };
        });
      })
    );
  }
}
