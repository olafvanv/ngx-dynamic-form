import { DynamicFormFieldRelation } from '../constants/dynamic-relations.const';
import { DynamicFormHook } from '../types/dynamic-form-hook.type';
import { DynamicFormValidator } from './dynamic-form-validator.interface';

export interface DynamicFormFieldConfig {
  /**
   * Whether the control has to be disabled.
   * Default value is false.
   * @optional
   */
  disabled?: boolean;
  /**
   * Whether the control should be hidden.
   * Default value is false
   * @optional
   */
  hidden?: boolean;
  /**
   * Adds an id attribute to the FormControl.
   * When not provided, the required 'name' property is used as id
   * @optional
   */
  id?: string;
  /**
   * Sets the width of the field, based on percentages. Default value is 100.
   * @optional
   */
  width?: number;
  /**
   * Used as mat-label when provided
   * @optional
   */
  label?: string | null;
  /**
   * Name used as FormControlName
   * @required
   */
  name: string;
  /**
   * Hint text underneath the FormControl
   * @optional
   */
  hint?: string;
  /**
   * Array of Dynamic Form Validators
   * @optional
   */
  validators?: DynamicFormValidator[];
  /**
   * Array of Dynamic Form Relations
   * @optional
   */
  relations?: DynamicFormFieldRelation[];
  /**
   * Event name for the control to update on.
   * Possible values: 'update', 'blur' or 'submit'.
   * Default values is 'update'
   * @optional
   */
  updateOn?: DynamicFormHook;
  /**
   * Parse method to parse the value of the form field to a specific format the application/API needs.
   * Is called when using the DynamicFormComponent method 'getFormValue()'
   * @optional
   */
  parseValue?: (val: any) => any;
  /**
   * Parses a value from the application/API to a value the form field expects.
   * Is called when initializing the form.
   * @optional
   */
  reverseParseValue?: (val: any) => any;
}
