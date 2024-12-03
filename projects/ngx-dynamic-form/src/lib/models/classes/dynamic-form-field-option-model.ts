import { isObservable, map, Observable, of } from 'rxjs';
import { DynamicFormFieldConfig } from '../interfaces/dynamic-form-field-config.interface';
import { DynamicFormFieldValueModel } from './dynamic-form-field-value-model';

export type DynamicOptionList<T> = DynamicFormFieldOption<T>[] | Observable<DynamicFormFieldOption<T>[]>;

export type DynamicGroupedOptionList<T> = DynamicFormFieldOptionGroup<T>[] | Observable<DynamicFormFieldOptionGroup<T>[]>;

/**
 * Interface for the objects inside a list of options of Dynamic FormField
 */
export interface DynamicFormFieldOption<T> {
  /** The text shown as label */
  label: string;
  /** Extra line of text shown as subtitle */
  subTitle?: string;
  /** The value the option holds */
  value: T;
}

/**
 * Interface for a group op options inside a Dynamic FormField (optgroup)
 */
export interface DynamicFormFieldOptionGroup<T> {
  name: string;
  options: DynamicFormFieldOption<T>[];
}

/**
 * Base interface for any DynamicFormFieldConfig with options (e.g. DynamicSelectConfig or DynamicAutocompleteConfig).
 */
export interface DynamicFormFieldOptionConfig<T> extends DynamicFormFieldConfig<T> {
  options?: DynamicOptionList<T>;
  groupedOptions?: DynamicGroupedOptionList<T>;
}

/**
 * Base class for any DynamicFormField with options (e.g. DynamicSelect or DynamicAutocomplete)
 */
export abstract class DynamicFormFieldOptionModel<T> extends DynamicFormFieldValueModel<T> {
  public options$!: Observable<DynamicFormFieldOption<T>[]>;
  public groupedOptions$!: Observable<DynamicFormFieldOptionGroup<T>[]>;

  private _options: DynamicFormFieldOption<T>[] = [];
  private _groupedOptions: DynamicFormFieldOptionGroup<T>[] = [];

  constructor(config: DynamicFormFieldOptionConfig<T>) {
    super(config);

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
