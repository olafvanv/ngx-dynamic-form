import { isObservable, map, Observable, of } from 'rxjs';
import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import { DynamicFormFieldOption } from '../../models/interfaces/dynamic-form-field-option.interface';
import { DynamicFormFieldValueConfig } from '../../models/interfaces/dynamic-form-field-value-config.interface';

export const DYNAMIC_FORM_FIELD_SELECT = 'select';

export interface DynamicSelectConfig<T> extends DynamicFormFieldValueConfig<T> {
  native?: boolean;
  multiple?: boolean;
  options: DynamicFormFieldOption<T>[] | Observable<DynamicFormFieldOption<T>[]>;
}

export class DynamicSelect<T> extends DynamicFormFieldValueModel<T> {
  public native: boolean;
  public multiple: boolean;
  public options$!: Observable<DynamicFormFieldOption<T>[]>;

  public readonly type = DYNAMIC_FORM_FIELD_SELECT;

  private _options: DynamicFormFieldOption<T>[] = [];

  constructor(config: DynamicSelectConfig<T>) {
    super(config);

    this.native = config.native ?? false;
    this.multiple = config.multiple ?? false;

    this.setOptions(config.options);
  }

  setOptions(options: DynamicFormFieldOption<T>[] | Observable<DynamicFormFieldOption<T>[]>) {
    if (Array.isArray(options)) {
      this._options = options;
      this.options$ = of(this._options);

      return;
    }

    if (isObservable(options)) {
      this.options$ = options.pipe(
        map((o) => {
          this._options = o;
          return this._options;
        })
      );

      return;
    }

    this.options$ = of([]);
  }
}
