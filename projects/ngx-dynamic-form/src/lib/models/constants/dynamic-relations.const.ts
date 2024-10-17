import { UntypedFormControl } from '@angular/forms';
import { DynamicFormFieldModel } from '../classes/dynamic-form-field-model';

export enum RelationActionType {
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
  HIDDEN = 'HIDE',
  VISIBLE = 'VISIBLE',
  REQUIRED = 'REQUIRED',
  OPTIONAL = 'OPTIONAL'
}

export enum RelationOperator {
  AND = 'AND',
  OR = 'OR'
}

export interface RelationCondition {
  fieldName: string;
  value: (val: any) => boolean;
}

export interface DynamicFormFieldRelation {
  actionType: RelationActionType;
  operator?: RelationOperator;
  conditions: RelationCondition[];
}

export interface DynamicRelationAction {
  type: RelationActionType;
  reversedType?: string;
  change(hasMatch: boolean, model: DynamicFormFieldModel, control: UntypedFormControl): void;
}

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
  change(hasMatch, model, control) {
    const validators = model.validators ? [...model.validators] : [];

    // if(hasMatch) {
    //   validators.push
    // }
  }
};

export const RELATION_ACTIONS: DynamicRelationAction[] = [DISABLE_ACTION, HIDDEN_ACTION];
