import { DynamicFormConfig, DynamicFormValidators, DynamicInput, RelationActionType } from 'ngx-dynamic-form';

export const BOOKING_ADDRESS_CONFIG: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'street',
      label: 'Street'
    })
  ],
  [
    new DynamicInput({
      name: 'postcode-dutch',
      label: 'Dutch postcode',
      hint: '1234AB',
      validators: [DynamicFormValidators.pattern(new RegExp('[0-9]{4}[a-zA-Z]{2}'))],
      relations: [
        {
          actionType: RelationActionType.VISIBLE,
          conditions: [
            {
              path: 'person.isDutch',
              value: (val: boolean) => val === true
            }
          ]
        }
      ]
    })
  ],
  [
    new DynamicInput({
      name: 'country',
      label: 'Country'
    })
  ]
];
