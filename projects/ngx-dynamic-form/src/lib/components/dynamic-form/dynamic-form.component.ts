import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormFieldModel } from '../../models/dynamic-form-field.model';
import { DynamicFormConfig } from '../../models/types/dynamic-form-config.type';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [NgFor, DynamicFormFieldComponent, ReactiveFormsModule]
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig!: DynamicFormConfig;

  @Output() ready: EventEmitter<UntypedFormGroup> = new EventEmitter();

  public group!: UntypedFormGroup;

  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit() {
    this.group = this.dynamicFormService.createFormGroup(this.formConfig);
    this.ready.emit(this.group);
  }

  /**
   * Get the formConfig as flat array.
   */
  public get flatFormConfig(): DynamicFormFieldModel[] {
    return this.formConfig.reduce((acc, curr) => acc.concat(curr), []);
  }

  /**
   * Get the current value of the form.
   * @param includeDisabledFields Include the disabled fields of the form, is enabled by default
   */
  public getFormValue<T = any>(includeDisabledFields = true): T {
    const formValue = includeDisabledFields ? this.group.getRawValue() : this.group.value;

    // Loop through the fields to check if the value needs to be parsed
    Object.keys(formValue).forEach((key) => {
      const config = this.flatFormConfig.find((f) => f.name === key);
      if (config?.parseValue) {
        const currVal = formValue[key];
        const newVal = config.parseValue(currVal);
        formValue[key] = newVal;
      }
    });
    return formValue;
  }

  /**
   * Provides an Observable to listen to changes of a specific field in the form.
   *
   * @param name Name of the field
   * @returns Observable<any>
   */
  public onChange(name: string): Observable<any> {
    const field = this.group.get(name);

    if (!field) {
      throw new Error(`Cannot find a field with the name ${name} in the FormGroup`);
    }

    return field.valueChanges;
  }
}
