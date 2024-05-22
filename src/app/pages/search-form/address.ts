import { FormControl } from '@angular/forms';
import { DynamicFormConfig, DynamicInput } from 'ngx-dynamic-form';
import { SliderInput } from 'src/app/shared/slider-input/slider-input.model';

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
      pattern: new RegExp('[0-9]{4}[a-zA-Z]{2}'),
      parseValue: (val: string) => val?.toUpperCase()
    })
  ],
  [
    new DynamicInput({
      name: 'street',
      label: 'Straatnaam',
      disabled: true
    })
  ],
  [
    new DynamicInput({
      name: 'city',
      label: 'Stad',
      disabled: true
    })
  ],
  [
    new SliderInput({
      name: 'rating',
      label: 'Rating',
      min: 0,
      max: 10,
      step: 1
    })
  ]
];
