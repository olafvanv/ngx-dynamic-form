import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicButtonTogglesComponent } from '../../controls/button-toggles/dynamic-button-toggles.component';
import { DYNAMIC_FORM_FIELD_BUTTON_TOGGLES } from '../../controls/button-toggles/dynamic-button-toggles.model';
import { DynamicButtonComponent } from '../../controls/button/dynamic-button.component';
import { DYNAMIC_FORM_FIELD_BUTTON } from '../../controls/button/dynamic-button.model';
import { DynamicCheckboxComponent } from '../../controls/checkbox/dynamic-checkbox.component';
import { DYNAMIC_FORM_FIELD_CHECKBOX } from '../../controls/checkbox/dynamic-checkbox.model';
import { DynamicDatepickerComponent } from '../../controls/datepicker/dynamic-datepicker.component';
import { DYNAMIC_FORM_FIELD_DATEPICKER } from '../../controls/datepicker/dynamic-datepicker.model';
import { DynamicInputComponent } from '../../controls/input/dynamic-input.component';
import { DYNAMIC_FORM_FIELD_INPUT } from '../../controls/input/dynamic-input.model';
import { DymamicRadioGroupComponent } from '../../controls/radio-group/dynamic-radio-group.component';
import { DYNAMIC_FORM_FIELD_RADIO_GROUP } from '../../controls/radio-group/dynamic-radio-group.model';
import { DynamicReadonlyComponent } from '../../controls/readonly/dynamic-readonly.component';
import { DYNAMIC_FORM_FIELD_READONLY } from '../../controls/readonly/dynamic-readonly.model';
import { DynamicSelectComponent } from '../../controls/select/dynamic-select.component';
import { DYNAMIC_FORM_FIELD_SELECT } from '../../controls/select/dynamic-select.model';
import { DynamicTextareaComponent } from '../../controls/textarea/dynamic-textarea.component';
import { DYNAMIC_FORM_FIELD_TEXTAREA } from '../../controls/textarea/dynamic-textarea.model';
import { DynamicFormField } from '../../models/classes/dynamic-form-field-base';
import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import { DynamicFormFieldEvent, DynamicFormFieldEventType } from '../../models/interfaces/dynamic-form-field-event.interface';
import { DynamicFormRelationsService } from '../../services/dynamic-form-relations.service';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
    imports: [NgClass, ReactiveFormsModule],
    selector: 'dynamic-form-field',
    templateUrl: 'dynamic-form-field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {
  @ViewChild('componentViewContainer', { read: ViewContainerRef, static: true }) componentViewContainer!: ViewContainerRef;

  @Input() model!: DynamicFormFieldModel;
  @Input() group!: UntypedFormGroup;

  @Output() change = new EventEmitter<DynamicFormFieldEvent>();

  private readonly dynamicFormService = inject(DynamicFormService);
  private readonly relationService = inject(DynamicFormRelationsService);
  private readonly cdRef = inject(ChangeDetectorRef);

  private _control!: UntypedFormControl;
  private _subs = new Subscription();

  /** Get the instance of a control component using the injected custom method or local method */
  private get componentType(): Type<DynamicFormField> | null {
    return this.dynamicFormService.getCustomControlComponentType(this.model) || this.getControlComponentType();
  }

  ngOnInit(): void {
    if (this.group) {
      this._control = this.group.get(this.model.name) as UntypedFormControl;

      this.createFormControlComponent();
      this.setSubscriptions();
    }
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
      case DYNAMIC_FORM_FIELD_BUTTON:
        return DynamicButtonComponent;
      case DYNAMIC_FORM_FIELD_BUTTON_TOGGLES:
        return DynamicButtonTogglesComponent;
      case DYNAMIC_FORM_FIELD_CHECKBOX:
        return DynamicCheckboxComponent;
      case DYNAMIC_FORM_FIELD_DATEPICKER:
        return DynamicDatepickerComponent;
      case DYNAMIC_FORM_FIELD_INPUT:
        return DynamicInputComponent;
      case DYNAMIC_FORM_FIELD_RADIO_GROUP:
        return DymamicRadioGroupComponent;
      case DYNAMIC_FORM_FIELD_READONLY:
        return DynamicReadonlyComponent;
      case DYNAMIC_FORM_FIELD_SELECT:
        return DynamicSelectComponent;
      case DYNAMIC_FORM_FIELD_TEXTAREA:
        return DynamicTextareaComponent;
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

      this._subs.add(componentInstance.change?.subscribe((event) => this.onChange(event)));

      componentInstance.group = this.group;
      componentInstance.model = this.model;
    }
  }

  /**
   * Setup all necessary subscriptions of the FormControl
   */
  private setSubscriptions(): void {
    const model = this.model as DynamicFormFieldModel;

    // Subscribe to the value change inside the control to change the value inside the model as well
    this._subs.add(this._control.valueChanges.subscribe((value) => this.onValueChange(value)));

    // Subscribe to the disabled change inside the model to change the disabled state of the FormControl
    this._subs.add(model.disabledChange.subscribe((disabled) => this.onDisabledChange(disabled)));

    // Setup subscriptions for any possible relation
    if (this.model.relations?.length) {
      this.setUpRelations();
    }
  }

  /**
   * Set up all relations of the current model
   */
  private setUpRelations(): void {
    // Array of all FormControls the current model has a relation to
    const relatedFormControls = this.relationService.findRelatedFormField(this.model, this.group);

    const subs = this.relationService.getRelationSubscriptions(relatedFormControls, this.model, this._control);

    // Add all relations as subscription to the main Subscription object
    subs.forEach((sub) => this._subs.add(sub));
  }

  /**
   * Fired when the value changes of the control and updates the value inside the model
   * @param value
   */
  private onValueChange(value: unknown): void {
    if (this.model instanceof DynamicFormFieldValueModel && this.model.value !== value) {
      this.model.value = value;
    }
  }

  /**
   * Enables/disabled the control based on the provided parameter.
   * Is fired when disabled state is changed inside the model and should not be directly used outside this component.
   * @param disabled
   */
  private onDisabledChange(disabled: boolean): void {
    disabled ? this._control.disable() : this._control.enable();

    this.cdRef.markForCheck();
  }

  private onChange(ev: unknown): void {
    this.change.emit(this.createDynamicFormEvent(ev, 'change'));
  }

  private createDynamicFormEvent(event: unknown, type: DynamicFormFieldEventType): DynamicFormFieldEvent {
    return { event, type, control: this._control, form: this.group, model: this.model };
  }
}
