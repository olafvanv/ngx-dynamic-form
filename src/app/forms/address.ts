import { FormControl } from '@angular/forms';
import { DynamicFormConfig, DynamicInput } from 'ngx-dynamic-form';

export interface AddressFormModel {
  postcode: FormControl<string | null>;
  street: FormControl<string | null>;
  city: FormControl<string | null>;
  province: FormControl<string | null>;
}

export const ADDRESS_FORM: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'postcode',
      label: 'Postcode',
      maxLength: 6,
      pattern: new RegExp('[0-9]{4}[a-zA-Z]{2}')
    })
  ],
  [
    new DynamicInput({
      name: 'street',
      label: 'Straatnaam'
    })
  ],
  [
    new DynamicInput({
      name: 'city',
      label: 'Stad'
    })
  ]
];
