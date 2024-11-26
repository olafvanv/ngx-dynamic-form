import { Validators } from '@angular/forms';
import { DynamicFormValidator } from '../interfaces/dynamic-form-validator.interface';

export class DynamicFormValidators {
  /**
   * Default email validator, the value of the control has to be a valid email address
   * @param msg
   */
  static email(msg?: string): DynamicFormValidator {
    const message: string = msg ?? 'Geen geldig emailadres';
    return { name: 'email', validator: Validators.email, message };
  }

  /**
   * Default min validator, the value has to be greater or equal than the the provided number
   * @param min number
   * @param msg
   */
  static min(min: number, msg?: string): DynamicFormValidator {
    const message: string = msg ?? `Minimum is ${min}`;
    return { name: 'min', validator: Validators.min(min), message };
  }

  /**
   * Default max validator, the value has to be less or equal than the the provided number
   * @param max number
   * @param msg
   */
  static max(max: number, msg?: string): DynamicFormValidator {
    const message: string = msg ?? `Maximum is ${max}`;
    return { name: 'max', validator: Validators.max(max), message };
  }

  /**
   * Default minLength validator, the value has to contain a minimum amount of characters
   * @param min number
   * @param msg
   */
  static minLength(min: number, msg?: string): DynamicFormValidator {
    const message: string = msg ?? `Minimaal ${min} tekens`;
    return { name: 'minLength', validator: Validators.min(min), message };
  }

  /**
   * Default maxLength validator, the value has to contain a maximum amount of characters
   * @param max number
   * @param msg
   */
  static maxLength(max: number, msg?: string): DynamicFormValidator {
    const message: string = msg ?? `Maximaal ${max} tekens`;
    return { name: 'maxLength', validator: Validators.max(max), message };
  }

  /**
   * Default pattern validator, the value of the control has to match the provided pattern
   * @param pattern: string | RegExp
   * @param msg
   */
  static pattern(pattern: string | RegExp, msg?: string): DynamicFormValidator {
    const message: string = msg ?? 'Geen geldige invoer';
    return { name: 'pattern', validator: Validators.pattern(pattern), message };
  }

  /**
   * Default required validator, the control must contain a value
   * @param msg
   */
  static required(msg?: string): DynamicFormValidator {
    const message: string = msg ?? 'Dit veld is verplicht';

    return { name: 'required', validator: Validators.required, message };
  }

  /**
   * Default requiredTrue validator, the value of the control has to be true
   * @param msg
   */
  static requiredTrue(msg?: string): DynamicFormValidator {
    const message: string = msg ?? 'Dit veld is verplicht';
    return { name: 'requiredTrue', validator: Validators.requiredTrue, message };
  }
}
