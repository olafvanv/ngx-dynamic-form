import { DynamicFormFieldOptionConfig, DynamicFormFieldOptionModel } from '../../models/classes/dynamic-form-field-option-model';

export const DYNAMIC_FORM_FIELD_SELECT = 'select';

export interface DynamicSelectConfig<T> extends DynamicFormFieldOptionConfig<T> {
  native?: boolean;
  multiple?: boolean;
}

export class DynamicSelect<T> extends DynamicFormFieldOptionModel<T> {
  public native: boolean;
  public multiple: boolean;

  public readonly type = DYNAMIC_FORM_FIELD_SELECT;

  constructor(config: DynamicSelectConfig<T>) {
    super(config);

    this.native = config.native ?? false;
    this.multiple = config.multiple ?? false;
  }
}
