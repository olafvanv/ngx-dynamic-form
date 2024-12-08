import { Injector } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DynamicFormValidationsService } from '../../services/dynamic-validations.service';
import { DynamicFormFieldModel } from '../classes/dynamic-form-field-model';
import { DynamicFormValidators } from '../classes/dynamic-form-validators';
import { RelationActionType } from '../interfaces/dynamic-form-field-relation.interface';
import { DynamicFormValidator } from '../interfaces/dynamic-form-validator.interface';

export interface DynamicRelationAction {
  type: RelationActionType;
  reversedType?: string;
  change(hasMatch: boolean, model: DynamicFormFieldModel, control: UntypedFormControl, injector: Injector): void;
}

/**
 * Relation action to disable/enable a form control.
 */
const DISABLE_ACTION: DynamicRelationAction = {
  type: RelationActionType.DISABLED,
  reversedType: RelationActionType.ENABLED,
  change(hasMatch, model) {
    model.disabled = hasMatch;
  }
};

/**
 * Relation action to toggle the visibility of a form control
 */
const HIDDEN_ACTION: DynamicRelationAction = {
  type: RelationActionType.HIDDEN,
  reversedType: RelationActionType.VISIBLE,
  change(hasMatch, model) {
    model.hidden = hasMatch;
  }
};

/**
 * Relation action to add or remove the required validator to a form control
 */
const REQUIRED_ACTION: DynamicRelationAction = {
  type: RelationActionType.REQUIRED,
  reversedType: RelationActionType.OPTIONAL,
  change(hasMatch, model, control, injector) {
    const hasRequiredValidation = !!model.validators.find((f) => f.name === 'required');
    let validators: DynamicFormValidator[];

    if (hasMatch) {
      // If the model already contains the required validator, return the model validators.
      // Otherwise, add the required validator
      validators = hasRequiredValidation ? model.validators : [...model.validators, DynamicFormValidators.required()];
    } else {
      validators = model.validators.filter((f) => f.name !== 'required');
    }

    injector.get(DynamicFormValidationsService).updateValidators(validators, control);
  }
};

/**
 * Export all Relation actions so the DynamicFormService can easily access all Relation actions.
 * This way if there are any new actions, all you have to do is add them here.
 * TODO: This can be potentially be expanded towords an InjectionToken to provide the possibility for custom relationactions.
 */
export const RELATION_ACTIONS: DynamicRelationAction[] = [DISABLE_ACTION, HIDDEN_ACTION, REQUIRED_ACTION];
