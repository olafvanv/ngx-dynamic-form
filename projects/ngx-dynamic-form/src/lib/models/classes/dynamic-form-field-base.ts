import { InputSignal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldModel } from './dynamic-form-field-model';

export interface DynamicFormField<M extends DynamicFormFieldModel = DynamicFormFieldModel> {
  group: InputSignal<FormGroup>;
  model: InputSignal<M>;
}

/**
 * Base class for the DynamicFormField component classes
 */
export abstract class DynamicFormFieldBase<M extends DynamicFormFieldModel = DynamicFormFieldModel> implements DynamicFormField<M> {
  abstract group: InputSignal<FormGroup>;
  abstract model: InputSignal<M>;

  get id(): string {
    return this.model().id ?? this.model().name;
  }

  get control(): AbstractControl {
    const ctrl = this.group().get(this.model().name);

    if (!ctrl) {
      throw new Error(`Provided FormGroup does not contain a control with the name ${this.model().name}`);
    }
    return ctrl;
  }

  get isValid(): boolean {
    return this.control.valid;
  }

  get isInvalid(): boolean {
    return this.control.invalid;
  }

  public resetControl() {
    this.group().get(this.model().name)?.reset();
  }

  public hasError(name: string): boolean {
    return this.control.hasError(name);
  }
}
