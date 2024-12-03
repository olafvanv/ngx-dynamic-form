import { DynamicFormFieldConfig, DynamicFormFieldValueModel } from 'ngx-dynamic-form';

export const DYNAMIC_FORM_FIELD_SLIDER = 'slider';

export interface SliderInputConfig extends DynamicFormFieldConfig<number> {
  /** Lowest value possible. Default is 1. */
  min?: number;
  /** Highest value possible. Default is 10. */
  max?: number;
  /** The step size of the slider when in- or decrementing. Default value is 1. */
  step?: number;
  /** The value where the slider starts. This does not set the value of the control, use defaultValue when the value has to be set. Default value is null */
  startValue?: number;
  /** Shows or hides the buttons for changing the value. Default value is true. */
  showButtons?: boolean;
}

export class SliderInput extends DynamicFormFieldValueModel<number> {
  public min: number;
  public max: number;
  public step: number;
  public startValue: number | null;

  public readonly type: string = DYNAMIC_FORM_FIELD_SLIDER;

  constructor(config: SliderInputConfig) {
    super(config);

    this.min = config.min ?? 0;
    this.max = config.max ?? 10;
    this.step = config.step ?? 1;
    this.startValue = config.startValue ?? null;

    this.defaultValue = this.startValue;
  }
}
