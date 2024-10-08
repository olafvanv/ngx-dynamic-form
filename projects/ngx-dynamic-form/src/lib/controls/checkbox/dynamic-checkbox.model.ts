import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import { DynamicFormFieldValueConfig } from '../../models/interfaces/dynamic-form-field-value-config.interface';
import { isBoolean } from '../../utils/methods.util';

export const DYNAMIC_FORM_FIELD_CHECKBOX = 'checkbox';

export interface DynamicCheckboxConfig extends DynamicFormFieldValueConfig<boolean> {
  labelPosition?: 'before' | 'after';
  indeterminate?: boolean;
}

export class DynamicCheckbox extends DynamicFormFieldValueModel<boolean> {
  public labelPosition: 'before' | 'after';
  public indeterminate: boolean;

  public readonly type: string = DYNAMIC_FORM_FIELD_CHECKBOX;

  constructor(config: DynamicCheckboxConfig) {
    super(config);

    this.labelPosition = config.labelPosition ?? 'after';
    this.indeterminate = isBoolean(config.indeterminate) ? config.indeterminate : false;
  }

  get checked(): boolean {
    return this.value ?? false;
  }

  set checked(checked: boolean) {
    this.value = checked;
  }

  public toggle() {
    this.checked = !this.checked;
  }
}
