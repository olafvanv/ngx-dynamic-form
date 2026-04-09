import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldConfig } from '../../models/types/dynamic-form-field-config.type';

export const DYNAMIC_FORM_FIELD_BUTTON = 'button';

type OmittedProperties = 'hint' | 'validators' | 'updateOn';

/**
 * @TODO icon support
 */
export type DynamicButtonConfig = Omit<DynamicFormFieldConfig, OmittedProperties> & {
  /**
   * Label shown inside the button
   */
  label: string;
  /**
   * Function called when the button is clicked.
   * Provides no parameters.
   * @returns
   */
  clicked: () => any;
};

export class DynamicButton extends DynamicFormFieldModel {
  public label: string | null;
  public clicked: () => any;

  public readonly type = DYNAMIC_FORM_FIELD_BUTTON;

  constructor(config: DynamicButtonConfig) {
    super(config);

    this.label = config.label ?? null;
    this.clicked = config.clicked;
  }
}
