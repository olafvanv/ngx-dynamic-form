import { EventEmitter } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldModel } from './dynamic-form-field-model.model';

export interface DynamicFormField {
  group: UntypedFormGroup;
  model: DynamicFormFieldModel;
  blur: EventEmitter<any>;
  change: EventEmitter<any>;
  focus: EventEmitter<any>;
}

export abstract class DynamicFormFieldComponent implements DynamicFormField {
  group!: UntypedFormGroup;
  model!: DynamicFormFieldModel;

  blur!: EventEmitter<any>;
  change!: EventEmitter<any>;
  focus!: EventEmitter<any>;

  get id(): string {
    return this.model.id ?? this.model.name;
  }

  get control(): AbstractControl {
    const ctrl = this.group.get(this.model.name);

    if (!ctrl) {
      throw new Error(`Provided FormGroup does not contain a control with the name ${this.model.name}`);
    }
    return ctrl;
  }

  get isValid(): boolean {
    return this.control.valid;
  }

  get isInvalid(): boolean {
    return this.control.invalid;
  }

  onBlur(ev: any) {
    this.blur.emit(ev);
  }

  onChange(ev: any) {
    this.change.emit(ev);
  }

  onFocus(ev: any) {
    this.focus.emit(ev);
  }
}
