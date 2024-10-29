import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicFormFieldConfig } from '../interfaces/dynamic-form-field-config.interface';

import { DynamicFormFieldRelation } from '../constants/dynamic-relations.const';
import { DynamicFormValidator } from '../interfaces/dynamic-form-validator.interface';
import { DynamicFormHook } from '../types/dynamic-form-hook.type';

export abstract class DynamicFormFieldModel {
  public hidden: boolean;
  public id: string;
  public width: number;
  public label: string | null;
  public name: string;
  public hint: string | null;
  public validators: DynamicFormValidator[];
  public updateOn: DynamicFormHook;
  public relations: DynamicFormFieldRelation[] | null;
  public disabledChange: Observable<boolean>;

  abstract readonly type: string;

  private readonly disabled$: BehaviorSubject<boolean>;

  constructor(config: DynamicFormFieldConfig) {
    this.hidden = config.hidden ?? false;
    this.id = config.id ?? config.name;
    this.width = config.width ?? 100;
    this.label = config.label ?? null;
    this.name = config.name;
    this.hint = config.hint ?? null;
    this.validators = config.validators ?? [];
    this.updateOn = config.updateOn ?? 'change';
    this.relations = config.relations ?? null;

    // Create a disabled Subject and Observable to change the state of the FormControl inside DynamicFormFieldComponent by subscribing to disabledChange
    this.disabled$ = new BehaviorSubject(config.disabled ?? false);
    this.disabledChange = this.disabled$.asObservable();
  }

  get disabled(): boolean {
    return this.disabled$.getValue();
  }
  set disabled(disable: boolean) {
    this.disabled$.next(disable);
  }
}
