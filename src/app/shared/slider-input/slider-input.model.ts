import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from 'ngx-dynamic-form';

export const DYNAMIC_FORM_FIELD_TYPE_SLIDER = 'slider';

export interface SliderInputConfig extends DynamicFormFieldValueConfig<number> {
  min: number;
  max: number;
  step: number;
  startValue: number;
}

export class SliderInput extends DynamicFormFieldValueModel<number> {
  public min: number;
  public max: number;
  public step: number;
  public startValue: number;

  public readonly type: string = DYNAMIC_FORM_FIELD_TYPE_SLIDER;

  constructor(config: SliderInputConfig) {
    super(config);

    this.min = config.min ?? 0;
    this.max = config.max ?? 10;
    this.step = config.step ?? 1;
    this.startValue = config.startValue ?? 0;

    this.defaultValue = this.startValue;
  }
}
