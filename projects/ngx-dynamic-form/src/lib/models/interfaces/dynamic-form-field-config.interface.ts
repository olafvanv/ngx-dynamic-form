import { DynamicFormFieldRelation } from './dynamic-form-field-relation.interface';
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
   * This will determine when Angular is checking the validators
   * Possible values:
   * - `change`: on every change event on the FormControl
   * - `blur`: on the blur event of the FormControl
   * - `submit`: when the parent form of the FormControl is submitted
   *
   * Default value is 'blur'.
   * @optional
   */
  updateOn?: 'submit' | 'blur' | 'change';
}
