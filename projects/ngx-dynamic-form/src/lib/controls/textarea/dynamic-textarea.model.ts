import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';

export const DYNAMIC_FORM_FIELD_TEXTAREA = 'textarea';
export type DynamicTextareaValue = string | null;

export interface DynamicTextareaConfig extends DynamicFormFieldValueConfig<DynamicTextareaValue> {
  /**
   * Placeholder text inside the textarea.
   * Only visible when the field is empty and in focus.
   */
  placeholder?: string;
  /**
   * Minimum amount of characters needed in the textarea
   */
  minLength?: number;
  /**
   * Maximum amount of characters it is possible to fill in the textarea
   */
  maxLength?: number;
  /**
   * Enables or disabled the browser natie autocomplete bubble when the control is in focus.
   * Default value is 'off'
   */
  autocomplete?: 'on' | 'off';
  /**
   * Amount of rows the textarea initializes on
   */
  rows?: number;
  /**
   * Whether the textare automatically resizes to fit its content
   */
  resize?: boolean;
  /**
   * Maximum amount of rows the textarea show resize to
   */
  resizeMaxRows?: number;
}

export class DynamicTextarea extends DynamicFormFieldValueModel<DynamicTextareaValue> {
  public placeholder: string;
  public minLength: number | null;
  public maxLength: number | null;
  public autocomplete: 'on' | 'off';
  public rows: number;
  public resize: boolean;
  public resizeMaxRows: number | null;

  public readonly type = DYNAMIC_FORM_FIELD_TEXTAREA;

  constructor(config: DynamicTextareaConfig) {
    super(config);

    this.placeholder = config.placeholder ?? '';
    this.minLength = config.minLength ?? 0;
    this.maxLength = config.minLength ?? null;
    this.autocomplete = config.autocomplete ?? 'off';
    this.rows = config.rows ?? 3;
    this.resize = config.resize ?? true;
    this.resizeMaxRows = config.resizeMaxRows ?? null;
  }
}
