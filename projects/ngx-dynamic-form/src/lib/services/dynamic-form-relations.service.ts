import { inject, Injectable, Injector } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl } from '@angular/forms';
import { distinctUntilChanged, startWith, Subscription } from 'rxjs';
import { DynamicFormFieldModel } from '../models/classes/dynamic-form-field-model';
import {
  DynamicFormFieldRelation,
  DynamicRelationAction,
  RELATION_ACTIONS,
  RelationCondition,
  RelationOperator
} from '../models/constants/dynamic-relations.const';
import { RelatedFormControls } from '../models/types/related-form-controls.type';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormRelationsService {
  private _injector = inject(Injector);
  /**
   * Get an object with all FormField the provided model has a relation with
   * @param model
   * @param group
   * @returns
   */
  public findRelatedFormField(model: DynamicFormFieldModel, group: FormGroup): RelatedFormControls {
    const conditionReducer = (controls: RelatedFormControls, condition: RelationCondition) => {
      const control = group.get(condition.fieldName) as UntypedFormControl;

      if (!control) {
        console.warn(`No related form control with the name ${condition.fieldName} found`);
        return controls;
      }

      controls[condition.fieldName] = control;
      return controls;
    };

    const relationsReducer = (controls: RelatedFormControls, relation: DynamicFormFieldRelation) => {
      return relation.conditions.reduce(conditionReducer, controls);
    };

    return model.relations!.reduce(relationsReducer, {});
  }

  public getRelationSubscriptions(
    relatedFormControls: RelatedFormControls,
    model: DynamicFormFieldModel,
    control: FormControl
  ): Subscription[] {
    const subs: Subscription[] = [];

    // Subscribe to value changes of all FormControls, provide the current value inside the startWith
    Object.values(relatedFormControls).forEach((relatedControl) => {
      subs.push(
        relatedControl.valueChanges.pipe(startWith(relatedControl.value), distinctUntilChanged()).subscribe(() => {
          model.relations!.forEach((relation) => {
            // Find the RelationAction object based on the actionType passed inside the DynamicFormConfig
            const action = RELATION_ACTIONS.find(
              (action) => relation.actionType === action.type || relation.actionType === action.reversedType
            );

            if (action) {
              const shouldTrigger = this.checkRelationCondition(relation, relatedFormControls, action);

              action.change(shouldTrigger, model, control, this._injector);
            }
          });
        })
      );
    });

    return subs;
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
    action: DynamicRelationAction
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

        return condition.value(relatedControl.value);
      }

      // Using the reversed type should return false when the condition matches, because we want to the opposite of the configured change Function
      if (relation.actionType === action.reversedType) {
        // Shortcut to true when a previous condition check was resolved as true
        if (index > 0 && operator === RelationOperator.AND && isMatch) return true;

        // Shortcut to false when a previous condition check was resolved as false
        if (index > 0 && operator === RelationOperator.OR && !isMatch) return false;

        return !condition.value(relatedControl.value);
      }

      return false;
    };

    return relation.conditions.reduce(reducer, false);
  }
}
