import { isBoolean } from '../../utils/methods.util';
import { DynamicFormFieldConfig } from '../interfaces/dynamic-form-field-config.interface';
import { DynamicFormValidator } from '../interfaces/dynamic-form-validator.interface';
import { DynamicFormHook } from '../types/dynamic-form-hook.type';

export abstract class DynamicFormFieldModel {
  public disabled: boolean;
  public hidden: boolean;
  public id: string | null;
  public label: string | null;
  public name: string;
  public hint: string | null;
  public validators: DynamicFormValidator[];
  public updateOn: DynamicFormHook;
  public parseValue: ((val: any) => any) | null;
  public reverseParseValue: ((val: any) => any) | null;

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
    this.parseValue = config.parseValue ?? null;
    this.reverseParseValue = config.reverseParseValue ?? null;
  }
}
