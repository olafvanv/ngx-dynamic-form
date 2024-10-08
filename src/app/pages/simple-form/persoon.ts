import { FormControl } from '@angular/forms';
import { DynamicCheckbox, DynamicFormConfig, DynamicFormValidators, DynamicInput } from 'ngx-dynamic-form';
import { DynamicReadonly } from 'projects/ngx-dynamic-form/src/lib/controls/readonly/dynamic-readonly.model';
import { DynamicTextarea } from 'projects/ngx-dynamic-form/src/lib/controls/textarea/dynamic-textarea.model';

export interface PersonFormModel {
  firstname: FormControl<string | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  telefoon: FormControl<string | null>;
  sex: FormControl<boolean | null>;
}

export const PERSOON_FORM: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'firstname',
      inputType: 'text',
      label: 'Voornaam',
      maxLength: 40,
      validators: [DynamicFormValidators.required()]
    }),
    new DynamicInput({
      name: 'name',
      inputType: 'text',
      label: 'Achternaam'
    })
  ],
  [
    new DynamicInput({
      name: 'email',
      inputType: 'email',
      label: 'E-mailadres'
    })
  ],
  [
    new DynamicInput({
      name: 'telefoon',
      inputType: 'tel',
      label: 'Telefoonnummer',
      prefix: '+'
    })
  ],
  [
    new DynamicReadonly({
      name: 'readonlyfield',
      label: 'instructie',
      value: 'Dit is een readonly'
    })
  ],
  [
    new DynamicCheckbox({
      name: 'sex',
      label: 'Ik ben een mannetje',
      labelPosition: 'before',
      validators: [DynamicFormValidators.requiredTrue()]
    })
  ],
  [
    new DynamicTextarea({
      name: 'verhaal',
      label: 'Verhaal',
      maxLength: 140,
      rows: 5
    })
  ]
];
