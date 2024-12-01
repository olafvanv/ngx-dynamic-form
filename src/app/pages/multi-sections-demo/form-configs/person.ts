import { DynamicCheckbox, DynamicFormConfig, DynamicFormValidators, DynamicInput } from 'ngx-dynamic-form';

export const BOOKING_PERSON_CONFIG: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'firstName',
      label: 'First name',
      validators: [DynamicFormValidators.required()]
    })
  ],
  [
    new DynamicInput({
      name: 'lastName',
      label: 'Last name',
      validators: [DynamicFormValidators.required()]
    })
  ],
  [
    new DynamicInput({
      name: 'phone',
      label: 'Phone number',
      inputType: 'number'
    })
  ],
  [
    new DynamicInput({
      name: 'email',
      label: 'Email address',
      validators: [DynamicFormValidators.email(), DynamicFormValidators.required()]
    })
  ],
  [
    new DynamicCheckbox({
      name: 'isDutch',
      label: 'Dutch citizen'
    })
  ]
];
