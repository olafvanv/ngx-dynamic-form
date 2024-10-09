import { FormControl } from '@angular/forms';
import {
  DynamicButton,
  DynamicCheckbox,
  DynamicFormConfig,
  DynamicFormValidators,
  DynamicInput,
  DynamicReadonly,
  DynamicSelect,
  DynamicTextarea
} from 'ngx-dynamic-form';

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
    }),
    new DynamicButton({
      name: 'button',
      text: 'Info',
      onClick: () => {
        alert('info');
      }
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
    new DynamicSelect<string>({
      name: 'gender',
      label: 'Gender',
      native: false,
      options: [
        {
          title: 'Man',
          value: 'M'
        },
        {
          title: 'Vrouw',
          value: 'V'
        }
      ],
      validators: [DynamicFormValidators.required()]
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
    new DynamicTextarea({
      name: 'verhaal',
      label: 'Biografie',
      maxLength: 140,
      rows: 5
    })
  ],
  [
    new DynamicCheckbox({
      name: 'agree',
      label: 'Ik ga akkoord',
      labelPosition: 'before',
      validators: [DynamicFormValidators.requiredTrue()]
    })
  ]
];
