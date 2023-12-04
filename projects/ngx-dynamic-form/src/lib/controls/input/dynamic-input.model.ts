import { DynamicFormFieldValueModel } from '../../models/dynamic-form-field-value.model';
import { DynamicFormFieldValueConfig } from '../../models/interfaces/dynamic-form-field-value-config.interface';
import { isNumber } from '../../utils/methods.util';

export const DYNAMIC_FORM_FIELD_TYPE_INPUT = 'input';

export type HtmlInputType = 'text' | 'number' | 'tel' | 'email' | 'password' | 'date' | 'time' | 'color';

export interface DynamicInputConfig extends DynamicFormFieldValueConfig<string | number | Date | null> {
  inputType?: HtmlInputType;
  max?: number | null;
  min?: number | null;
  maxLength?: number | null;
  minLength?: number | null;
  step?: number | null;
  pattern?: string | RegExp;
  autocomplete?: 'on' | 'off';
  prefix?: string | null;
}

export class DynamicInput extends DynamicFormFieldValueModel<string | number | Date | null> {
  public inputType: HtmlInputType;
  public max: number | null;
  public min: number | null;
  public maxLength: number | null;
  public minLength: number | null;
  public step: number | null;
  public pattern: string | RegExp;
  public autocomplete: 'on' | 'off';
  public prefix: string | null;

  public readonly type = DYNAMIC_FORM_FIELD_TYPE_INPUT;

  constructor(config: DynamicInputConfig) {
    super(config);

    this.inputType = config.inputType ?? 'text';
    this.max = config.max ?? null;
    this.min = config.min ?? null;
    this.maxLength = isNumber(config.maxLength) ? config.maxLength : null;
    this.minLength = isNumber(config.minLength) ? config.minLength : null;
    this.step = config.step ?? null;
    this.pattern = config.pattern ?? '';
    this.autocomplete = config.autocomplete ?? 'off';
    this.prefix = config.prefix ?? null;
  }
}
