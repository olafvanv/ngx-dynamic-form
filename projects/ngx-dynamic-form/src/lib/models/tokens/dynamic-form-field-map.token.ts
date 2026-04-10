import { InjectionToken, Type } from '@angular/core';
import { DynamicFormField } from '../classes/dynamic-form-field-base';

export const DYNAMIC_FORM_FIELD_MAP = new InjectionToken<Record<string, Type<DynamicFormField<any>>>>('DYNAMIC_FORM_FIELD_MAP');
