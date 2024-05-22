import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from 'ngx-dynamic-form';

export const DYNAMIC_FORM_FIELD_TYPE_SLIDER = 'slider';

export interface SliderInputConfig extends DynamicFormFieldValueConfig<number | null> {
  min: number;
  max: number;
  step: number;
}

export class SliderInput extends DynamicFormFieldValueModel<number | null> {
  public min: number = 0;
  public max: number = 10;
  public step: number = 1;

  public readonly type: string = DYNAMIC_FORM_FIELD_TYPE_SLIDER;

  constructor(config: SliderInputConfig) {
    super(config);

    this.min = config.min ?? 0;
    this.max = config.max ?? 10;
    this.step = config.step ?? 1;
  }
}
