import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { distinctUntilChanged, startWith, Subscription } from 'rxjs';
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
import {
  DynamicFormFieldRelation,
  RELATION_ACTIONS,
  RelationAction,
  RelationCondition,
  RelationOperator
} from '../../models/constants/dynamic-relations.const';
import { DynamicFormField } from '../../models/interfaces/dynamic-form-field.interface';
import { RelatedFormControls } from '../../models/types/related-form-controls.type';
import { DynamicFormRelationService } from '../../services/dynamic-form-relation.service';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  selector: 'dynamic-form-field',
  templateUrl: 'dynamic-form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {
  @ViewChild('componentViewContainer', { read: ViewContainerRef, static: true }) componentViewContainer!: ViewContainerRef;

  @Input() model!: DynamicFormFieldModel;
  @Input() group!: UntypedFormGroup;

  private _control!: UntypedFormControl;
  private _subs = new Subscription();

  private dynamicFormService = inject(DynamicFormService);
  private relationService = inject(DynamicFormRelationService);
  private cdRef = inject(ChangeDetectorRef);

  /** Get the instance of a control component using the injected custom method or local method */
  private get componentType(): Type<DynamicFormField> | null {
    return this.dynamicFormService.getCustomControlComponentType(this.model) || this.getControlComponentType();
  }

  ngOnInit(): void {
    if (this.group) {
      this._control = this.group.get(this.model.name) as UntypedFormControl;

      this.createFormControlComponent();
      this.setSubscriptions();

      if (this.model.relations?.length) {
        this.setUpRelations();
      }
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

  /**
   *
   */
  private setSubscriptions(): void {
    const model = this.model as DynamicFormFieldValueModel<unknown>;

    // Subscribe to the value change inside the control to chagne the value inside the model as well
    this._subs.add(this._control.valueChanges.subscribe((value) => this.onValueChange(value)));

    // Subscribe to the disabled change inside the model to change the disabled state of the FormControl
    this._subs.add(model.disabledChange.subscribe((disabled) => this.onDisabledChange(disabled)));
  }

  /**
   * Set up all relations of the current model
   */
  private setUpRelations(): void {
    // Array of all FormControls the current model has a relation to
    const relatedFormControls: RelatedFormControls = this.relationService.findRelatedFormField(this.model, this.group);

    // Subscribe to value changes of all FormControls, provide the current value inside the startWith
    Object.values(relatedFormControls).forEach((control) => {
      this._subs.add(
        control.valueChanges.pipe(startWith(control.value), distinctUntilChanged()).subscribe((val) => {
          this.model.relations!.forEach((relation) => {
            // Find the RelationAction object based on the actionType passed inside the DynamicFormConfig
            const action = RELATION_ACTIONS.find(
              (action) => relation.actionType === action.type || relation.actionType === action.reversedType
            );

            if (action) {
              const shouldTrigger = this.checkRelationCondition(relation, relatedFormControls, action);

              action.change(shouldTrigger, this.model, control);
            }
          });
        })
      );
    });
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
  }

  /**
   * Check the conditions inside the relations
   * @param relation
   * @param relatedControl
   * @param action
   * @returns
   */
  private checkRelationCondition(
    relation: DynamicFormFieldRelation,
    relatedControls: RelatedFormControls,
    action: RelationAction
  ): boolean {
    // Default operator is AND, meaning all conditions should return true before the provided action is triggered.
    // In the case of a reversed type, the return value whould be false.
    const operator = relation.operator ?? RelationOperator.AND;

    // Use a reducer to map all conditions to a single boolean value to decide if we want to trigger the provided action type
    const reducer = (isMatch: boolean, condition: RelationCondition, index: number): boolean => {
      // Find the FormControl of the related field
      let relatedControl: UntypedFormControl | undefined;

      for (const [fieldName, control] of Object.entries(relatedControls)) {
        if (fieldName === condition.fieldName) {
          relatedControl = control;
          break;
        }
      }

      if (!relatedControl) return false;

      // Using the 'normal' type should return true when the condition matches
      if (relation.actionType === action.type) {
        // Shortcut to false when a previous condition check was resolved as false
        if (index > 0 && operator === RelationOperator.AND && !isMatch) return false;

        // Shortcut to true when a previous condition check was resolved as true
        if (index > 0 && operator === RelationOperator.OR && isMatch) return true;

        return condition.value === relatedControl.value;
      }

      // Using the reversed type should return false when the condition matches, because we want to the opposite of the configured change Function
      if (relation.actionType === action.reversedType) {
        // Shortcut to true when a previous condition check was resolved as true
        if (index > 0 && operator === RelationOperator.AND && isMatch) return true;

        // Shortcut to false when a previous condition check was resolved as false
        if (index > 0 && operator === RelationOperator.OR && !isMatch) return false;

        return condition.value !== relatedControl.value;
      }

      return false;
    };

    return relation.conditions.reduce(reducer, false);
  }
}
