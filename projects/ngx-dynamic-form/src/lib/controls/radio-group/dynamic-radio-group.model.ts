import { DynamicFormFieldOptionConfig, DynamicFormFieldOptionModel } from '../../models/classes/dynamic-form-field-option-model';

export const DYNAMIC_FORM_FIELD_RADIO_GROUP = 'radio-group';

export interface DynamicRadioGroupConfig extends DynamicFormFieldOptionConfig<string | number> {
  /** Placement of the option label. Default is 'before' */
  labelPosition?: 'before' | 'after';
  /** Whether the options are shown inline (horizontally). Default is false */
  inline?: boolean;
}

export class DynamicRadioGroup extends DynamicFormFieldOptionModel<string | number> {
  public labelPosition: 'before' | 'after';
  public inline: boolean;

  public readonly type: string = DYNAMIC_FORM_FIELD_RADIO_GROUP;

  constructor(config: DynamicRadioGroupConfig) {
    super(config);

    this.labelPosition = config.labelPosition ?? 'after';
    this.inline = config.inline ?? false;
  }
}
