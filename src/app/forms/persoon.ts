import { DynamicCheckbox, DynamicFormConfig, DynamicInput } from 'ngx-dynamic-form';

export const PERSOON_FORM: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'firstname',
      inputType: 'text',
      label: 'Voornaam'
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
      name: 'test',
      label: 'Ik ben een mannetje',
      labelPosition: 'before'
    })
  ]
];
