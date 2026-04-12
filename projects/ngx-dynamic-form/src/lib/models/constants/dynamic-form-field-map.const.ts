import { Type } from '@angular/core';
import { DynamicAutocompleteComponent } from '../../controls/autocomplete/dynamic-autocomplete.component';
import { DynamicButtonTogglesComponent } from '../../controls/button-toggles/dynamic-button-toggles.component';
import { DynamicButtonComponent } from '../../controls/button/dynamic-button.component';
import { DynamicCheckboxComponent } from '../../controls/checkbox/dynamic-checkbox.component';
import {
  DYNAMIC_FORM_FIELD_AUTOCOMPLETE,
  DYNAMIC_FORM_FIELD_BUTTON,
  DYNAMIC_FORM_FIELD_BUTTON_TOGGLES,
  DYNAMIC_FORM_FIELD_CHECKBOX,
  DYNAMIC_FORM_FIELD_DATEPICKER,
  DYNAMIC_FORM_FIELD_INPUT,
  DYNAMIC_FORM_FIELD_RADIO_GROUP,
  DYNAMIC_FORM_FIELD_READONLY,
  DYNAMIC_FORM_FIELD_SELECT,
  DYNAMIC_FORM_FIELD_SLIDE_TOGGLE,
  DYNAMIC_FORM_FIELD_STATIC_TEXT,
  DYNAMIC_FORM_FIELD_TEXTAREA
} from '../../controls/controls';
import { DynamicDatepickerComponent } from '../../controls/datepicker/dynamic-datepicker.component';
import { DynamicInputComponent } from '../../controls/input/dynamic-input.component';
import { DynamicRadioGroupComponent } from '../../controls/radio-group/dynamic-radio-group.component';
import { DynamicReadonlyComponent } from '../../controls/readonly/dynamic-readonly.component';
import { DynamicSelectComponent } from '../../controls/select/dynamic-select.component';
import { DynamicSlideToggleComponent } from '../../controls/slide-toggle/dynamic-slide-toggle.component';
import { DynamicStaticTextComponent } from '../../controls/static-text/dynamic-static-text.component';
import { DynamicTextareaComponent } from '../../controls/textarea/dynamic-textarea.component';
import { DynamicFormField } from '../classes/dynamic-form-field-base';

export const DYNAMIC_FORM_FIELD_MAP: Record<string, Type<DynamicFormField<any>>> = {
  [DYNAMIC_FORM_FIELD_AUTOCOMPLETE]: DynamicAutocompleteComponent,
  [DYNAMIC_FORM_FIELD_BUTTON]: DynamicButtonComponent,
  [DYNAMIC_FORM_FIELD_BUTTON_TOGGLES]: DynamicButtonTogglesComponent,
  [DYNAMIC_FORM_FIELD_CHECKBOX]: DynamicCheckboxComponent,
  [DYNAMIC_FORM_FIELD_DATEPICKER]: DynamicDatepickerComponent,
  [DYNAMIC_FORM_FIELD_INPUT]: DynamicInputComponent,
  [DYNAMIC_FORM_FIELD_RADIO_GROUP]: DynamicRadioGroupComponent,
  [DYNAMIC_FORM_FIELD_READONLY]: DynamicReadonlyComponent,
  [DYNAMIC_FORM_FIELD_SELECT]: DynamicSelectComponent,
  [DYNAMIC_FORM_FIELD_SLIDE_TOGGLE]: DynamicSlideToggleComponent,
  [DYNAMIC_FORM_FIELD_STATIC_TEXT]: DynamicStaticTextComponent,
  [DYNAMIC_FORM_FIELD_TEXTAREA]: DynamicTextareaComponent
};
