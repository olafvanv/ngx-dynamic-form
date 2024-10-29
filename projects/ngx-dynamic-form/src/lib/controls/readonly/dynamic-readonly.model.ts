import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';

export const DYNAMIC_FORM_FIELD_READONLY = 'readonly';
export type DynamicReadonlyValue = string | number | null;

export interface DynamicReadonlyConfig extends DynamicFormFieldValueConfig<DynamicReadonlyValue> {}

export class DynamicReadonly extends DynamicFormFieldValueModel<DynamicReadonlyValue> {
  public readonly type = DYNAMIC_FORM_FIELD_READONLY;

  constructor(config: DynamicReadonlyConfig) {
    super(config);
  }
}
