import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import { DynamicFormFieldConfig } from '../../models/interfaces/dynamic-form-field-config.interface';

export const DYNAMIC_FORM_FIELD_READONLY = 'readonly';
export type DynamicReadonlyValue = string | number | null;

export interface DynamicReadonlyConfig
  extends Omit<DynamicFormFieldConfig<DynamicReadonlyValue>, 'validators' | 'relations' | 'updateOn'> {}

export class DynamicReadonly extends DynamicFormFieldValueModel<DynamicReadonlyValue> {
  public readonly type = DYNAMIC_FORM_FIELD_READONLY;

  constructor(config: DynamicReadonlyConfig) {
    super(config);
  }
}
