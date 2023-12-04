import { DynamicFormFieldConfig } from './dynamic-form-field-config.interface';

export interface DynamicFormFieldValueConfig<T> extends DynamicFormFieldConfig {
  value?: T | null;
  defaultValue?: T | null;
}
