import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicCheckboxComponent } from '../../controls/checkbox/dynamic-checkbox.component';
import { DYNAMIC_FORM_FIELD_TYPE_CHECKBOX } from '../../controls/checkbox/dynamic-checkbox.model';
import { DynamicInputComponent } from '../../controls/input/dynamic-input.component';
import { DYNAMIC_FORM_FIELD_TYPE_INPUT } from '../../controls/input/dynamic-input.model';
import { DynamicFormFieldValueModel } from '../../models/dynamic-form-field-value.model';
import { DynamicFormFieldModel } from '../../models/dynamic-form-field.model';
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

  get componentType(): Type<DynamicFormField> | null {
    return this.dynamicFormService.getCustomComponentType(this.model) || this.getControlComponentType();
  }

  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit(): void {
    this.createFormControlComponent();
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  private getControlComponentType(): Type<DynamicFormField> | null {
    switch (this.model.type) {
      case DYNAMIC_FORM_FIELD_TYPE_CHECKBOX:
        return DynamicCheckboxComponent;
      case DYNAMIC_FORM_FIELD_TYPE_INPUT:
        return DynamicInputComponent;
      default:
        return null;
    }
  }

  private createFormControlComponent(): void {
    const component = this.componentType;

    if (!!component) {
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
