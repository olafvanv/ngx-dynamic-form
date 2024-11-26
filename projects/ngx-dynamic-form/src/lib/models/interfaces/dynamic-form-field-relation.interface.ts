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
  /** Name of a field in the same form this field is depended on */
  fieldName: string;
  /** Method that returns true when the condition is met. The passed parameter is the value of the depended field */
  value: (val: any) => boolean;
}

export interface DynamicFormFieldRelation {
  actionType: RelationActionType;
  conditions: RelationCondition[];
  operator?: RelationOperator;
}
