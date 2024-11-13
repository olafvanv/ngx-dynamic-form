import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldEvent } from '../../models/interfaces/dynamic-form-field-event.interface';
import { DynamicFormConfig } from '../../models/types/dynamic-form-config.type';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';

@Component({
  standalone: true,
  imports: [NgFor, NgClass, DynamicFormFieldComponent, ReactiveFormsModule],
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [DynamicFormService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  @Input({ required: true }) formConfig!: DynamicFormConfig;

  @Output() ready: EventEmitter<UntypedFormGroup> = new EventEmitter();
  @Output() change: EventEmitter<DynamicFormFieldEvent> = new EventEmitter();

  private dynamicFormService = inject(DynamicFormService);

  public group!: UntypedFormGroup;

  /**
   * Get the formConfig as flat array.
   */
  public get flatFormConfig(): DynamicFormFieldModel[] {
    return this.formConfig.reduce((acc, curr) => acc.concat(curr), []);
  }

  ngOnInit() {
    this.group = this.dynamicFormService.createFormGroup(this.formConfig);
    this.ready.emit(this.group);
  }

  public trackByFn(_index: number, field: DynamicFormFieldModel): string {
    return field.id;
  }

  /**
   * Get the current value of the form.
   * @param includeDisabledFields Include the disabled fields of the form, is enabled by default
   */
  public getFormValue<T = unknown>(includeDisabledFields = true): T {
    const formValue = includeDisabledFields ? this.group.getRawValue() : this.group.value;

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

  public onControlChange(event: DynamicFormFieldEvent) {
    this.change.emit(event);
  }
}
