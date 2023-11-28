import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models/dynamic-form-field-model.model';

export const DYNAMIC_FORM_FIELD_TYPE_CHECKBOX = 'checkbox';

export interface DynamicCheckboxConfig extends DynamicFormFieldValueConfig<boolean> {
  labelPosition?: 'before' | 'after';
  indeterminate?: boolean;
}

export class DynamicCheckbox extends DynamicFormFieldValueModel<boolean> {
  public labelPosition: 'before' | 'after';
  public indeterminate: boolean;

  public readonly type: string = DYNAMIC_FORM_FIELD_TYPE_CHECKBOX;

  constructor(config: DynamicCheckboxConfig) {
    super(config);

    this.labelPosition = config.labelPosition ?? 'after';
    this.indeterminate = typeof config.indeterminate === 'boolean' ? config.indeterminate : false;
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
