import { Observable } from 'rxjs';

export type DynamicOptionList<T> = DynamicFormFieldOption<T>[] | Observable<DynamicFormFieldOption<T>[]>;

export type DynamicGroupedOptionList<T> = DynamicFormFieldOptionGroup<T>[] | Observable<DynamicFormFieldOptionGroup<T>[]>;

export interface DynamicFormFieldOption<T> {
  /** The text shown as label */
  label: string;
  /** Extra line of text shown as subtitle */
  subTitle?: string;
  /** The value the option holds */
  value: T;
}

export interface DynamicFormFieldOptionGroup<T> {
  name: string;
  options: DynamicFormFieldOption<T>[];
}
