import { NgClass } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicButtonComponent } from '../../controls/button/dynamic-button.component';
import { DYNAMIC_FORM_FIELD_BUTTON } from '../../controls/button/dynamic-button.model';
import { DynamicCheckboxComponent } from '../../controls/checkbox/dynamic-checkbox.component';
import { DYNAMIC_FORM_FIELD_CHECKBOX } from '../../controls/checkbox/dynamic-checkbox.model';
import { DynamicInputComponent } from '../../controls/input/dynamic-input.component';
import { DYNAMIC_FORM_FIELD_INPUT } from '../../controls/input/dynamic-input.model';
import { DynamicReadonlyComponent } from '../../controls/readonly/dynamic-readonly.component';
import { DYNAMIC_FORM_FIELD_READONLY } from '../../controls/readonly/dynamic-readonly.model';
import { DynamicSelectComponent } from '../../controls/select/dynamic-select.component';
import { DYNAMIC_FORM_FIELD_SELECT } from '../../controls/select/dynamic-select.model';
import { DynamicTextareaComponent } from '../../controls/textarea/dynamic-textarea.component';
import { DYNAMIC_FORM_FIELD_TEXTAREA } from '../../controls/textarea/dynamic-textarea.model';
import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import { DynamicFormField } from '../../models/interfaces/dynamic-form-field.interface';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: 'dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
  standalone: true,
  imports: [NgClass, ReactiveFormsModule]
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {
  @ViewChild('componentViewContainer', { read: ViewContainerRef, static: true }) componentViewContainer!: ViewContainerRef;

  @Input() model!: DynamicFormFieldModel;
  @Input() group!: UntypedFormGroup;

  private _subs = new Subscription();
  private dynamicFormService = inject(DynamicFormService);

  /** Get the instance of a control component using the injected custom method or local method */
  private get componentType(): Type<DynamicFormField> | null {
    return this.dynamicFormService.getCustomControlComponentType(this.model) || this.getControlComponentType();
  }

  ngOnInit(): void {
    this.createFormControlComponent();
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  /**
   * Finds the instance of a control component by type
   * @returns
   */
  private getControlComponentType(): Type<DynamicFormField> | null {
    switch (this.model.type) {
      case DYNAMIC_FORM_FIELD_CHECKBOX:
        return DynamicCheckboxComponent;
      case DYNAMIC_FORM_FIELD_INPUT:
        return DynamicInputComponent;
      case DYNAMIC_FORM_FIELD_TEXTAREA:
        return DynamicTextareaComponent;
      case DYNAMIC_FORM_FIELD_READONLY:
        return DynamicReadonlyComponent;
      case DYNAMIC_FORM_FIELD_SELECT:
        return DynamicSelectComponent;
      case DYNAMIC_FORM_FIELD_BUTTON:
        return DynamicButtonComponent;
      default:
        console.warn(
          `Model of type 'dynamic-${this.model.type}' is not implemented yet. Add this type to dynamic-form-field.component.ts to add support`
        );
        return null;
    }
  }

  private createFormControlComponent(): void {
    const component = this.componentType;

    if (component != null) {
      let componentRef = this.componentViewContainer.createComponent(component);

      const componentInstance = componentRef.instance;

      componentInstance.group = this.group;
      componentInstance.model = this.model;
    }
  }

  private setSubscriptions(): void {
    const model = this.model as DynamicFormFieldValueModel<unknown>;
    this._subs.add(model.valueChanges.subscribe((val) => this.onControlChanges(val)));
  }

  private onControlChanges(value: unknown): void {
    if (this.model instanceof DynamicFormFieldValueModel && this.model.value !== value) {
      this.model.value = value;
    }
  }
}
