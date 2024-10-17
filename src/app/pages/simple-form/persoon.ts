import { FormControl } from '@angular/forms';
import {
  DynamicButton,
  DynamicCheckbox,
  DynamicFormConfig,
  DynamicFormValidators,
  DynamicInput,
  DynamicReadonly,
  DynamicSelect,
  DynamicTextarea,
  RelationActionType,
  RelationOperator
} from 'ngx-dynamic-form';
import { SliderInput } from '../../shared/slider-input/slider-input.model';

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
    new SliderInput({
      name: 'age',
      label: 'Age',
      max: 100,
      validators: [DynamicFormValidators.min(18, 'Minimale leeftijd is 18 jaar')]
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
      rows: 5,
      relations: [
        {
          actionType: RelationActionType.DISABLED,
          operator: RelationOperator.OR,
          conditions: [
            {
              fieldName: 'firstname',
              value: 'Olaf'
            },
            {
              fieldName: 'gender',
              value: 'M'
            }
          ]
        }
      ]
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
