import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldConfig } from '../../models/interfaces/dynamic-form-field-config.interface';

export const DYNAMIC_FORM_FIELD_BUTTON = 'button';

type OmittedProperties = 'hint' | 'validators' | 'updateOn';

export interface DynamicButtonConfig extends Omit<DynamicFormFieldConfig, OmittedProperties> {
  /**
   * Label shown inside the button
   */
  label: string;
  /**
   * Function called when the button is clicked.
   * Provides no parameters.
   * @returns
   */
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
