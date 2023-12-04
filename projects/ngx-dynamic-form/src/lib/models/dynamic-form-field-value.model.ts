import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormFieldModel } from './dynamic-form-field.model';
import { DynamicFormFieldValueConfig } from './interfaces/dynamic-form-field-value-config.interface';

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
