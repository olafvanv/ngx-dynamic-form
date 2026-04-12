import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models';

export const DYNAMIC_FORM_FIELD_STATIC_TEXT = 'static-text';

export type DynamicStaticTextValue = {
  title?: string;
  text?: string;
};

export type DynamicStaticTextConfig = DynamicFormFieldValueConfig<DynamicStaticTextValue>;

export class DynamicStaticText extends DynamicFormFieldValueModel<DynamicStaticTextValue> {
  public readonly type = DYNAMIC_FORM_FIELD_STATIC_TEXT;

  constructor(config: DynamicStaticTextConfig) {
    super(config);
  }
}
