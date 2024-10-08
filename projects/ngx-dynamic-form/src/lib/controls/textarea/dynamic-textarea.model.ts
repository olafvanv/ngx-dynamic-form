import { DynamicFormFieldValueModel } from '../../models/dynamic-form-field-value.model';
import { DynamicFormFieldValueConfig } from '../../models/interfaces/dynamic-form-field-value-config.interface';

export const DYNAMIC_FORM_FIELD_TYPE_TEXTAREA = 'textarea';
export type DynamicTextareaValue = string | null;

export interface DynamicTextareaConfig extends DynamicFormFieldValueConfig<DynamicTextareaValue> {
  minLength?: number | null;
  maxLength?: number | null;
  autocomplete?: 'on' | 'off';
  rows?: number;
  resize?: boolean;
  resizeMaxRows?: number;
}

export class DynamicTextarea extends DynamicFormFieldValueModel<DynamicTextareaValue> {
  public minLength: number | null;
  public maxLength: number | null;
  public autocomplete: 'on' | 'off';
  public rows: number;
  public resize: boolean;
  public resizeMaxRows: number | null;

  public readonly type = DYNAMIC_FORM_FIELD_TYPE_TEXTAREA;

  constructor(config: DynamicTextareaConfig) {
    super(config);

    this.minLength = config.minLength ?? 0;
    this.maxLength = config.minLength ?? null;
    this.autocomplete = config.autocomplete ?? 'off';
    this.rows = config.rows ?? 3;
    this.resize = config.resize ?? true;
    this.resizeMaxRows = config.resizeMaxRows ?? null;
  }
}
