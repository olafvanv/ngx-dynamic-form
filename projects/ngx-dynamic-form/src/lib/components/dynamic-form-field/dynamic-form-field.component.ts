import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  Type,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormField } from '../../models/classes/dynamic-form-field-base';
import { DynamicFormFieldModel } from '../../models/classes/dynamic-form-field-model';
import { DynamicFormFieldValueModel } from '../../models/classes/dynamic-form-field-value-model';
import { DYNAMIC_FORM_FIELD_MAP } from '../../models/constants/dynamic-form-field-map.const';
import { DynamicFormRelationsService } from '../../services/dynamic-form-relations.service';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  imports: [NgClass, ReactiveFormsModule],
  selector: 'dynamic-form-field',
  templateUrl: 'dynamic-form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {
  private componentViewContainer = viewChild.required('componentViewContainer', { read: ViewContainerRef });

  public model = input.required<DynamicFormFieldModel>();
  public group = input.required<FormGroup>();

  private readonly dynamicFormService = inject(DynamicFormService);
  private readonly relationService = inject(DynamicFormRelationsService);
  private readonly cdRef = inject(ChangeDetectorRef);

  private _control!: FormControl;
  private _subs = new Subscription();

  /**
   * Get the instance of a control component using the injected custom method or local method
   */
  private get componentType(): Type<DynamicFormField<any>> | null {
    return this.dynamicFormService.getCustomControlComponentType(this.model()) || this.getControlComponentType();
  }

  ngOnInit(): void {
    if (this.group()) {
      this._control = this.group().get(this.model().name) as FormControl;

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
  private getControlComponentType(): Type<DynamicFormField<any>> | null {
    const field = DYNAMIC_FORM_FIELD_MAP[this.model().type];

    if (!field) {
      console.warn(
        `Model of type 'dynamic-${this.model().type}' is not implemented yet. Add this type to dynamic-form-field.component.ts to add support`
      );
      return null;
    }

    return field;
  }

  private createFormControlComponent(): void {
    const component = this.componentType;

    if (component != null) {
      let componentRef = this.componentViewContainer().createComponent(component);

      componentRef.setInput('group', this.group());
      componentRef.setInput('model', this.model());
    }
  }

  /**
   * Setup all necessary subscriptions of the FormControl
   */
  private setSubscriptions(): void {
    const model = this.model() as DynamicFormFieldModel;

    // Subscribe to the value change inside the control to change the value inside the model as well
    this._subs.add(this._control.valueChanges.subscribe((value) => this.onValueChange(value)));

    // Subscribe to the disabled change inside the model to change the disabled state of the FormControl
    this._subs.add(model.disabledChange.subscribe((disabled) => this.onDisabledChange(disabled)));

    // Setup subscriptions for any possible relation
    if (this.model().relations?.length) {
      this.setUpRelations();
    }
  }

  /**
   * Set up all relations of the current model
   */
  private setUpRelations(): void {
    // Array of all FormControls the current model has a relation to
    const relatedFormControls = this.relationService.findRelatedFormField(this.model(), this.group());

    const subs = this.relationService.getRelationSubscriptions(relatedFormControls, this.model(), this._control);

    // Add all relations as subscription to the main Subscription object
    subs.forEach((sub) => this._subs.add(sub));
  }

  /**
   * Fired when the value changes of the control and updates the value inside the model
   * @param value
   */
  private onValueChange(value: unknown): void {
    if (this.model() instanceof DynamicFormFieldValueModel && (this.model() as DynamicFormFieldValueModel).value !== value) {
      (this.model() as DynamicFormFieldValueModel).value = value;
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
}
