import { NgClass } from '@angular/common';
import { Component, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicCheckboxComponent } from '../../controls/checkbox/dynamic-checkbox.component';
import { DYNAMIC_FORM_FIELD_TYPE_CHECKBOX } from '../../controls/checkbox/dynamic-checkbox.model';
import { DynamicInputComponent } from '../../controls/input/dynamic-input.component';
import { DYNAMIC_FORM_FIELD_TYPE_INPUT } from '../../controls/input/dynamic-input.model';
import { DynamicFormFieldModel } from '../../models/dynamic-form-field-model.model';
import { DynamicFormField } from '../../models/dynamic-form-field.model';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: 'dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
  standalone: true,
  imports: [NgClass, ReactiveFormsModule]
})
export class DynamicFormFieldComponent implements OnInit {
  @Input() model!: DynamicFormFieldModel;
  @Input() group!: UntypedFormGroup;

  @ViewChild('componentViewContainer', { read: ViewContainerRef, static: true }) componentViewContainer!: ViewContainerRef;

  get componentType(): Type<DynamicFormField> | null {
    return this.dynamicFormService.getCustomComponentType(this.model) || this.getControlComponentType();
  }

  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit(): void {
    this.createFormControlComponent();
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
}
