import { Injectable } from '@angular/core';
import { FormGroup, UntypedFormControl } from '@angular/forms';
import { DynamicFormFieldModel } from '../models/classes/dynamic-form-field-model';
import { DynamicFormFieldRelation, RelationCondition } from '../models/constants/dynamic-relations.const';
import { RelatedFormControls } from '../models/types/related-form-controls.type';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormRelationService {
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
}
