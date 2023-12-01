import { FormControl } from '@angular/forms';
import { DynamicCheckbox, DynamicFormConfig, DynamicInput } from 'ngx-dynamic-form';

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
      showMaxLengthCount: true
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
    new DynamicCheckbox({
      name: 'sex',
      label: 'Ik ben een mannetje',
      labelPosition: 'before'
    })
  ]
];
