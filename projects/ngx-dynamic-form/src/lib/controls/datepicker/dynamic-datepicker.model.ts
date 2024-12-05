import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';

export const DYNAMIC_FORM_FIELD_DATEPICKER = 'datepicker';

export type DynamicDatepickerControlValue = Date | object | string | null;

export interface DynamicDatepickerConfig extends DynamicFormFieldValueConfig<DynamicDatepickerControlValue> {
  /** Maximum date selectable in the datepicker */
  max?: DynamicDatepickerControlValue;
  /** Minimum date selectable in the datepicker */
  min?: DynamicDatepickerControlValue;
  /** The initial date visible inside the datepicker when opening the picker */
  startAt?: DynamicDatepickerControlValue;
  /** The view the picker is initializing when opening */
  startView?: 'month' | 'year' | 'multi-year';
}

export class DynamicDatepicker extends DynamicFormFieldValueModel<DynamicDatepickerControlValue> {
  public max: DynamicDatepickerControlValue | null;
  public min: DynamicDatepickerControlValue | null;
  public startAt: DynamicDatepickerControlValue | null;
  public startView: 'month' | 'year' | 'multi-year';

  public readonly type = DYNAMIC_FORM_FIELD_DATEPICKER;

  constructor(config: DynamicDatepickerConfig) {
    super(config);

    this.max = config.max ?? null;
    this.min = config.min ?? null;
    this.startAt = config.startAt ?? null;
    this.startView = config.startView ?? 'month';
  }
}
