import { DynamicFormHook } from '../types/dynamic-form-hook.type';
import { DynamicFormValidator } from './dynamic-form-validator.interface';

export interface DynamicFormFieldConfig {
  /**
   * Whether the control has to be disabled
   * @optional
   */
  disabled?: boolean;
  /**
   * Whether the control should be hidden
   * @optional
   */
  hidden?: boolean;
  /**
   * Added as id attribute to the FormControl
   * @optional
   */
  id?: string;
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
   * Event name for the control to update on.
   * Possible values: 'update', 'blur' or 'submit'.
   * Default values is 'update'
   * @optional
   */
  updateOn?: DynamicFormHook;
}
