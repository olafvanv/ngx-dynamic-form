export interface DynamicFormFieldOption<T> {
  /** The text shown as label */
  title: string;
  /** Extra line of text shown as subtitle */
  subTitle?: string;
  /** The value the option holds */
  value: T;
}
