import { DynamicFormFieldOptionConfig, DynamicFormFieldOptionModel } from '../../models/classes/dynamic-form-field-option-model';

export const DYNAMIC_FORM_FIELD_BUTTON_TOGGLES = 'button-toggles';

export interface DynamicButtonTogglesConfig extends Omit<DynamicFormFieldOptionConfig<string | number>, 'label'> {
  /** Whether to allow multiple options to be selected. Default is false */
  multiple?: boolean;
  /** Whether the toggle group is vertical. Default is false */
  vertical?: boolean;
}

export class DynamicButtonToggles extends DynamicFormFieldOptionModel<string | number> {
  public multiple: boolean;
  public vertical: boolean;

  public readonly type: string = DYNAMIC_FORM_FIELD_BUTTON_TOGGLES;

  constructor(config: DynamicButtonTogglesConfig) {
    super(config);

    this.multiple = config.multiple ?? false;
    this.vertical = config.vertical ?? false;
  }
}
