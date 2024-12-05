import { BehaviorSubject } from 'rxjs';
import { DynamicFormFieldConfig } from '../interfaces/dynamic-form-field-config.interface';
import { DynamicFormFieldModel } from './dynamic-form-field-model';

export interface DynamicFormFieldValueConfig<T> extends DynamicFormFieldConfig {
  /**
   * The value of the control.
   * This value will change when the control is used.
   * @optional
   */
  value?: T;
  /**
   * The default value of the control when initializing or resetting the control.
   * @optional
   */
  defaultValue?: T;
  /**
   * A function that gets called everytime the value of the control changes.
   * Passes the value of the control as parameter.
   * If you don't want to get an event on every keystroke without delay, use the ReactiveFormsModule `valueChanges` Observable
   * @optional
   */
  valueChanged?: (val: T | null) => any;
}

/**
 * Base class for a DynamicFormField with a value
 */
export abstract class DynamicFormFieldValueModel<T = unknown> extends DynamicFormFieldModel {
  public defaultValue: T | null;

  private _value$: BehaviorSubject<T | null>;
  private _valueChanged: ((val: T | null) => any) | undefined;

  constructor(config: DynamicFormFieldValueConfig<T>) {
    super(config);

    this.defaultValue = config.defaultValue ?? null;

    const val: T | null = config.value ?? null;
    this._value$ = new BehaviorSubject(val);
    this._valueChanged = config.valueChanged;
  }

  get value(): T | null {
    return this._value$.getValue();
  }
  set value(val: T | null) {
    this._value$.next(val);
    if (this._valueChanged) {
      this._valueChanged(val);
    }
  }
}
