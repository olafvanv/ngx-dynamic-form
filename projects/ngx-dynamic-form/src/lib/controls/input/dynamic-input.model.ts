import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';

export const DYNAMIC_FORM_FIELD_INPUT = 'input';

export type HtmlInputType = 'text' | 'number' | 'tel' | 'email' | 'password' | 'date' | 'time' | 'color';

export interface DynamicInputConfig extends DynamicFormFieldValueConfig<string | number | Date | null> {
  inputType?: HtmlInputType;
  placeholder?: string;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  step?: number;
  pattern?: string | RegExp;
  autocomplete?: 'on' | 'off';
  prefix?: string;
  hideClearIcon?: boolean;
}

export class DynamicInput extends DynamicFormFieldValueModel<string | number | Date | null> {
  public inputType: HtmlInputType;
  public placeholder: string;
  public max: number | null;
  public min: number | null;
  public maxLength: number | null;
  public minLength: number | null;
  public step: number | null;
  public pattern: string | RegExp;
  public autocomplete: 'on' | 'off';
  public prefix: string | null;
  public hideClearIcon: boolean;

  public readonly type = DYNAMIC_FORM_FIELD_INPUT;

  constructor(config: DynamicInputConfig) {
    super(config);

    this.inputType = config.inputType ?? 'text';
    this.placeholder = config.placeholder ?? config.label ?? '';
    this.max = config.max ?? null;
    this.min = config.min ?? null;
    this.maxLength = typeof config.maxLength === 'number' ? config.maxLength : null;
    this.minLength = typeof config.minLength === 'number' ? config.minLength : null;
    this.step = config.step ?? null;
    this.pattern = config.pattern ?? '';
    this.autocomplete = config.autocomplete ?? 'off';
    this.prefix = config.prefix ?? null;
    this.hideClearIcon = config.hideClearIcon ?? false;
  }
}
