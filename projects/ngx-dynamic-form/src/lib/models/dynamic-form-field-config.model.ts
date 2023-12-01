import { Validator } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { isBoolean } from '../utils/methods.util';
import { DynamicFormHook } from './types/dynamic-form-hook.type';

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
   * Array of (Custom) Angular Validators
   * @optional
   */
  validators?: Validator[];
  /**
   * Event name for the control to update on.
   * Possible values: 'update', 'blur' or 'submit'.
   * Default values is 'update'
   * @optional
   */
  updateOn?: DynamicFormHook;
}

export abstract class DynamicFormFieldModel {
  public disabled: boolean;
  public hidden: boolean;
  public id: string | null;
  public label: string | null;
  public name: string;
  public hint: string | null;
  public validators: Validator[] = [];
  public updateOn: DynamicFormHook;

  abstract readonly type: string;

  constructor(config: DynamicFormFieldConfig) {
    this.disabled = isBoolean(config.disabled) ? config.disabled : false;
    this.hidden = isBoolean(config.hidden) ? config.hidden : false;
    this.id = config.id ?? null;
    this.label = config.label ?? null;
    this.name = config.name;
    this.hint = config.hint ?? null;
    this.validators = config.validators ?? [];
    this.updateOn = config.updateOn ?? 'change';
  }
}

export interface DynamicFormFieldValueConfig<T> extends DynamicFormFieldConfig {
  value?: T | null;
  defaultValue?: T | null;
}

export abstract class DynamicFormFieldValueModel<T> extends DynamicFormFieldModel {
  public valueChanges: Observable<T | null>;

  private _value: T | null;
  private _value$: BehaviorSubject<T | null>;

  constructor(config: DynamicFormFieldValueConfig<T>) {
    super(config);

    this._value = config.value ?? null;
    this._value$ = new BehaviorSubject(this._value);
    this.valueChanges = this._value$.asObservable();
  }

  get value(): T | null {
    return this._value$.getValue();
  }

  set value(val: T | null) {
    this._value$.next(val);
  }
}
