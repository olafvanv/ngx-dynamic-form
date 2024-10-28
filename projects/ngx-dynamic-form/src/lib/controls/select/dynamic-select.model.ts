import { isObservable, map, Observable, of } from 'rxjs';
import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import {
  DynamicFormFieldOption,
  DynamicFormFieldOptionGroup,
  DynamicGroupedOptionList,
  DynamicOptionList
} from '../../models/interfaces/dynamic-form-field-option.interface';
import { DynamicFormFieldValueConfig } from '../../models/interfaces/dynamic-form-field-value-config.interface';

export const DYNAMIC_FORM_FIELD_SELECT = 'select';

export interface DynamicSelectConfig<T> extends DynamicFormFieldValueConfig<T> {
  native?: boolean;
  multiple?: boolean;
  options?: DynamicOptionList<T>;
  groupedOptions?: DynamicGroupedOptionList<T>;
}

export class DynamicSelect<T> extends DynamicFormFieldValueModel<T> {
  public native: boolean;
  public multiple: boolean;
  public options$!: Observable<DynamicFormFieldOption<T>[]>;
  public groupedOptions$!: Observable<DynamicFormFieldOptionGroup<T>[]>;

  public readonly type = DYNAMIC_FORM_FIELD_SELECT;

  private _options: DynamicFormFieldOption<T>[] = [];
  private _groupedOptions: DynamicFormFieldOptionGroup<T>[] = [];

  constructor(config: DynamicSelectConfig<T>) {
    super(config);

    this.native = config.native ?? false;
    this.multiple = config.multiple ?? false;

    if (!config.options && !config.groupedOptions) {
      console.error(`No options or groupedOptions provided for ${this.name}`);
    }

    if (config.options) {
      this.options$ = this.setOptions(config.options);
    } else if (config.groupedOptions) {
      this.groupedOptions$ = this.setGroupedOptions(config.groupedOptions);
    }
  }

  private setOptions(options: DynamicOptionList<T>): Observable<DynamicFormFieldOption<T>[]> {
    if (Array.isArray(options)) {
      this._options = options;
      return of(this._options);
    }

    if (isObservable(options)) {
      return options.pipe(
        map((o) => {
          this._options = o;
          return this._options;
        })
      );
    }

    return of([]);
  }

  private setGroupedOptions(groupedOptions: DynamicGroupedOptionList<T>): Observable<DynamicFormFieldOptionGroup<T>[]> {
    if (Array.isArray(groupedOptions)) {
      this._groupedOptions = groupedOptions;
      return of(this._groupedOptions);
    }

    if (isObservable(groupedOptions)) {
      return groupedOptions.pipe(
        map((o) => {
          this._groupedOptions = o;
          return this._groupedOptions;
        })
      );
    }

    return of([]);
  }
}
