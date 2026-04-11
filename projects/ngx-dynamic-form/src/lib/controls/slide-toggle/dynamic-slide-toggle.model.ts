import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';

export const DYNAMIC_FORM_FIELD_SLIDE_TOGGLE = 'slide-toggle';

export type DynamicSlideToggleConfig = DynamicFormFieldValueConfig<boolean> & {
  /**
   * Whether the label appears before or after the slide toggle.
   * @default 'after'
   */
  labelPosition?: 'before' | 'after';
};

export class DynamicSlideToggle extends DynamicFormFieldValueModel<boolean> {
  public labelPosition: 'before' | 'after';

  public readonly type: string = DYNAMIC_FORM_FIELD_SLIDE_TOGGLE;

  constructor(config: DynamicSlideToggleConfig) {
    super(config);

    this.value = config.value ?? false;
    this.labelPosition = config.labelPosition ?? 'after';
  }

  get checked(): boolean {
    return this.value ?? false;
  }

  set checked(checked: boolean) {
    this.value = checked;
  }
}
