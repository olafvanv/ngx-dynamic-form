import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldConfig } from '../../models/interfaces/dynamic-form-field-config.interface';

export const DYNAMIC_FORM_FIELD_BUTTON = 'button';

export interface DynamicButtonConfig extends DynamicFormFieldConfig {
  text: string;
  raised?: boolean;
  onClick: () => any;
}

export class DynamicButton extends DynamicFormFieldModel {
  public text: string | null;
  public raised: boolean;
  public onClick: () => any;

  public readonly type = DYNAMIC_FORM_FIELD_BUTTON;

  constructor(config: DynamicButtonConfig) {
    super(config);

    this.text = config.text ?? null;
    this.raised = config.raised ?? false;
    this.onClick = config.onClick;
  }
}
