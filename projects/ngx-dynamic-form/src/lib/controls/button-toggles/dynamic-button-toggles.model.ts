import { DynamicFormFieldOptionConfig, DynamicFormFieldOptionModel } from '../../models/classes/dynamic-form-field-option-model';

export const DYNAMIC_FORM_FIELD_BUTTON_TOGGLES = 'button-toggles';

export interface DynamicButtonTogglesConfig extends DynamicFormFieldOptionConfig<string | number> {
  /** Whether to allow multiple options to be selected. Default is false */
  multiple?: boolean;
  /** Whether the toggle group is vertical. Default is false */
  vertical?: boolean;
  /** Whether to show a label above the field. Default is false */
  showLabel?: boolean;
  /** Placement of the field label. Default is above */
  fieldLabelPosition?: 'above' | 'before';
}

export class DynamicButtonToggles extends DynamicFormFieldOptionModel<string | number> {
  public multiple: boolean;
  public vertical: boolean;
  public showLabel: boolean;
  public fieldLabelPosition: 'above' | 'before';

  public readonly type: string = DYNAMIC_FORM_FIELD_BUTTON_TOGGLES;

  constructor(config: DynamicButtonTogglesConfig) {
    super(config);

    this.multiple = config.multiple ?? false;
    this.vertical = config.vertical ?? false;
    this.showLabel = config.showLabel ?? false;
    this.fieldLabelPosition = config.fieldLabelPosition ?? 'above';
  }
}
