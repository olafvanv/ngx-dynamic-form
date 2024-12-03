import { BehaviorSubject } from 'rxjs';
import { DynamicFormFieldConfig } from '../interfaces/dynamic-form-field-config.interface';
import { DynamicFormFieldModel } from './dynamic-form-field-model';

/**
 * Base class for a DynamicFormField with a value
 */
export abstract class DynamicFormFieldValueModel<T> extends DynamicFormFieldModel {
  public defaultValue: T | null;

  private _value$: BehaviorSubject<T | null>;

  constructor(config: DynamicFormFieldConfig<T>) {
    super(config);

    this.defaultValue = config.defaultValue ?? null;

    const val: T | null = config.value ?? null;
    this._value$ = new BehaviorSubject(val);
  }

  get value(): T | null {
    return this._value$.getValue();
  }
  set value(val: T | null) {
    this._value$.next(val);
  }
}
