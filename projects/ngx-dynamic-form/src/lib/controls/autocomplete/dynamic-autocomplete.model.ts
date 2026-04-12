import { Observable } from 'rxjs';
import {
  DynamicFormFieldOption,
  DynamicFormFieldOptionConfig,
  DynamicFormFieldOptionModel
} from '../../models/classes/dynamic-form-field-option-model';

export const DYNAMIC_FORM_FIELD_AUTOCOMPLETE = 'autocomplete';

export type DynamicAutocompleteConfig<T = string> = DynamicFormFieldOptionConfig<T> & {
  /**
   * Optional search function for asynchronous searching.
   * If provided, the internal search logic will use this instead of filtering the static options.
   */
  searchFn?: (term: string) => Observable<DynamicFormFieldOption<T>[]>;
  /**
   * Optional filter function for custom local filtering of pre-fetched options.
   * Only used if searchFn is not provided.
   */
  filterFn?: (term: string, option: DynamicFormFieldOption<T>) => boolean;
  /**
   * Debounce time in milliseconds for the search function (default: 300ms).
   */
  debounceTime?: number;
  placeholder?: string;
  /**
   * Optional function to format the selected value for display in the input field.
   */
  displayFn?: (value: T) => string;
};

export class DynamicAutocomplete<T = string> extends DynamicFormFieldOptionModel<T> {
  public searchFn?: (term: string) => Observable<DynamicFormFieldOption<T>[]>;
  public filterFn?: (term: string, option: DynamicFormFieldOption<T>) => boolean;
  public displayFn?: (value: T) => string;
  public debounceTime: number;
  public placeholder: string;

  public readonly type = DYNAMIC_FORM_FIELD_AUTOCOMPLETE;

  constructor(config: DynamicAutocompleteConfig<T>) {
    super(config);

    this.searchFn = config.searchFn;
    this.filterFn = config.filterFn;
    this.displayFn = config.displayFn;
    this.debounceTime = config.debounceTime ?? 300;
    this.placeholder = config.placeholder ?? config.label ?? '';
  }
}
