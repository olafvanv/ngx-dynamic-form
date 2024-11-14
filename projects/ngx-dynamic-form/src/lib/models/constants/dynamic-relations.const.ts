import { DynamicFormValidationsService } from '../../services/dynamic-validations.service';
import { DynamicFormValidators } from '../classes/dynamic-form-validators';
import { DynamicRelationAction, RelationActionType } from '../interfaces/dynamic-form-field-relation.interface';
import { DynamicFormValidator } from '../interfaces/dynamic-form-validator.interface';

const DISABLE_ACTION: DynamicRelationAction = {
  type: RelationActionType.DISABLED,
  reversedType: RelationActionType.ENABLED,
  change(hasMatch, model) {
    model.disabled = hasMatch;
  }
};

const HIDDEN_ACTION: DynamicRelationAction = {
  type: RelationActionType.HIDDEN,
  reversedType: RelationActionType.VISIBLE,
  change(hasMatch, model) {
    model.hidden = hasMatch;
  }
};

const REQUIRED_ACTION: DynamicRelationAction = {
  type: RelationActionType.REQUIRED,
  reversedType: RelationActionType.OPTIONAL,
  change(hasMatch, model, control, injector) {
    const hasRequiredValidation = !!model.validators.find((f) => f.name === 'required');
    let validators: DynamicFormValidator[];

    if (hasMatch) {
      validators = hasRequiredValidation ? model.validators : [...model.validators, DynamicFormValidators.required()];
    } else {
      validators = model.validators.filter((f) => f.name === 'required');
    }

    injector.get(DynamicFormValidationsService).updateValidators(validators, control);
  }
};

export const RELATION_ACTIONS: DynamicRelationAction[] = [DISABLE_ACTION, HIDDEN_ACTION, REQUIRED_ACTION];
