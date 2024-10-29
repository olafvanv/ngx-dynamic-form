import { EventEmitter } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldModel } from './dynamic-form-field-model';

export interface DynamicFormField {
  group: UntypedFormGroup;
  model: DynamicFormFieldModel;
  blur: EventEmitter<any>;
  change: EventEmitter<any>;
  focus: EventEmitter<any>;
}

export abstract class DynamicFormFieldBaseComponent implements DynamicFormField {
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

  public onBlur(ev: any) {
    this.blur.emit(ev);
  }

  public onChange(ev: any) {
    this.change.emit(ev);
  }

  public onFocus(ev: any) {
    this.focus.emit(ev);
  }

  public resetControl() {
    this.group.get(this.model.name)?.reset();
  }

  public hasError(name: string): boolean {
    return this.control.hasError(name);
  }
}
