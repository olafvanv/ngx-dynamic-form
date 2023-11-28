import { Validator } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DynamicFormFieldConfig {
  disabled?: boolean;
  hidden?: boolean;
  id?: string;
  label?: string;
  name: string;
  hint?: string;
  validators?: Validator[];
}

export abstract class DynamicFormFieldModel {
  public disabled: boolean;
  public hidden?: boolean;
  public id?: string;
  public label?: string;
  public name: string;
  public hint: string | null;
  public validators: Validator[] = [];

  abstract readonly type: string;

  constructor(config: DynamicFormFieldConfig) {
    this.disabled = typeof config.disabled === 'boolean' ? config.disabled : false;
    this.hidden = typeof config.hidden === 'boolean' ? config.hidden : false;
    this.id = config.id;
    this.label = config.label;
    this.name = config.name;
    this.hint = config.hint ?? null;
    this.validators = config.validators ?? [];
  }
}

export interface DynamicFormFieldValueConfig<T> extends DynamicFormFieldConfig {
  value?: T;
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
