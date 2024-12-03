import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import { DynamicFormFieldConfig } from '../../models/interfaces/dynamic-form-field-config.interface';

export const DYNAMIC_FORM_FIELD_CHECKBOX = 'checkbox';

export interface DynamicCheckboxConfig extends DynamicFormFieldConfig<boolean> {
  labelPosition?: 'before' | 'after';
  indeterminate?: boolean;
}

export class DynamicCheckbox extends DynamicFormFieldValueModel<boolean> {
  public labelPosition: 'before' | 'after';
  public indeterminate: boolean;

  public readonly type: string = DYNAMIC_FORM_FIELD_CHECKBOX;

  constructor(config: DynamicCheckboxConfig) {
    super(config);

    this.value = config.value ?? false;

    this.labelPosition = config.labelPosition ?? 'after';
    this.indeterminate = config.indeterminate === true ? true : false;
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
