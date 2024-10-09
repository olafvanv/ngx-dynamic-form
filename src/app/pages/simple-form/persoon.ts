import { FormControl } from '@angular/forms';
import { DynamicCheckbox, DynamicFormConfig, DynamicFormValidators, DynamicInput } from 'ngx-dynamic-form';
import { DynamicReadonly } from 'projects/ngx-dynamic-form/src/lib/controls/readonly/dynamic-readonly.model';
import { DynamicSelect } from 'projects/ngx-dynamic-form/src/lib/controls/select/dynamic-select.model';
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
