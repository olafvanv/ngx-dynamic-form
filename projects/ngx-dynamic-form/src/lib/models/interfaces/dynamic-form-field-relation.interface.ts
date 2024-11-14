import { Injector } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DynamicFormFieldModel } from '../classes/dynamic-form-field-model';

export enum RelationActionType {
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
  HIDDEN = 'HIDDEN',
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
  change(hasMatch: boolean, model: DynamicFormFieldModel, control: UntypedFormControl, injector: Injector): void;
}
