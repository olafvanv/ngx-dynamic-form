import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';

export const DYNAMIC_FORM_FIELD_DATETIMEPICKER = 'datetimepicker';

export type DynamicDatetimepickerControlValue = Date | object | string | null;

export type DynamicDatetimepickerConfig = Omit<DynamicFormFieldValueConfig<DynamicDatetimepickerControlValue>, 'label'> & {
  /** Label for date field */
  labelDate?: string;
  /** Label for time field */
  labelTime?: string;
  /** Maximum date selectable in the datetimepicker */
  max?: DynamicDatetimepickerControlValue;
  /** Minimum date selectable in the datetimepicker */
  min?: DynamicDatetimepickerControlValue;
  /** The initial date visible inside the datepicker when opening the picker */
  startAt?: DynamicDatetimepickerControlValue;
  /** The view the picker is initializing when opening */
  startView?: 'month' | 'year' | 'multi-year';
};

export class DynamicDatetimepicker extends DynamicFormFieldValueModel<DynamicDatetimepickerControlValue> {
  public max: DynamicDatetimepickerControlValue | null;
  public min: DynamicDatetimepickerControlValue | null;
  public labelDate: string | null;
  public labelTime: string | null;
  public startAt: DynamicDatetimepickerControlValue | null;
  public startView: 'month' | 'year' | 'multi-year';

  public readonly type = DYNAMIC_FORM_FIELD_DATETIMEPICKER;

  constructor(config: DynamicDatetimepickerConfig) {
    super(config);

    this.max = config.max ?? null;
    this.min = config.min ?? null;
    this.labelDate = config.labelDate ?? null;
    this.labelTime = config.labelTime ?? null;
    this.startAt = config.startAt ?? null;
    this.startView = config.startView ?? 'month';
  }
}
