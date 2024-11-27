import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldConfig } from '../../models/interfaces/dynamic-form-field-config.interface';

export const DYNAMIC_FORM_FIELD_BUTTON = 'button';

export interface DynamicButtonConfig extends DynamicFormFieldConfig {
  label: string;
  onClick: () => any;
}

export class DynamicButton extends DynamicFormFieldModel {
  public label: string | null;
  public onClick: () => any;

  public readonly type = DYNAMIC_FORM_FIELD_BUTTON;

  constructor(config: DynamicButtonConfig) {
    super(config);

    this.label = config.label ?? null;
    this.onClick = config.onClick;
  }
}
