import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  DynamicCheckbox,
  DynamicDatepicker,
  DynamicFormComponent,
  DynamicFormConfig,
  DynamicFormService,
  DynamicFormValidators,
  DynamicInput,
  DynamicRadioGroup,
  DynamicSelect,
  DynamicSlideToggle,
  DynamicStaticText,
  DynamicTextarea,
  RelationActionType
} from 'ngx-dynamic-form';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, DynamicFormComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {
  private dynamicFormService = inject(DynamicFormService);

  public config: DynamicFormConfig = [
    // 1. Identity Section
    new DynamicStaticText({
      name: 'identity-header',
      value: { title: 'Personal Identity' }
    }),
    new DynamicInput({
      name: 'firstName',
      label: 'First Name',
      validators: [DynamicFormValidators.required()]
    }),
    new DynamicInput({
      name: 'lastName',
      label: 'Last Name',
      validators: [DynamicFormValidators.required()]
    }),
    new DynamicInput({
      name: 'email',
      label: 'Email Address',
      inputType: 'email',
      validators: [DynamicFormValidators.required(), DynamicFormValidators.email()]
    }),
    new DynamicInput({
      name: 'password',
      label: 'Secure Password',
      inputType: 'password'
    }),

    // 2. User Preferences
    new DynamicStaticText({
      name: 'preferences-header',
      value: { title: 'User Preferences' }
    }),
    new DynamicSelect({
      name: 'theme',
      label: 'Application Theme',
      groupedOptions: [
        {
          name: 'Light Themes',
          options: [
            { label: 'Standard White', value: 'light' },
            { label: 'Solarized Light', value: 'solarized' }
          ]
        },
        {
          name: 'Dark Themes',
          options: [
            { label: 'Deep Blue', value: 'dark-blue' },
            { label: 'High Contrast', value: 'high-contrast' }
          ]
        }
      ]
    }),
    new DynamicRadioGroup({
      name: 'language',
      label: 'Preferred Language',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Dutch', value: 'nl' },
        { label: 'German', value: 'de' }
      ]
    }),
    new DynamicSlideToggle({
      name: 'enableNotifications',
      label: 'Enable Push Notifications',
      value: true
    }),

    // 3. Advanced Options (Toggled by Checkbox)
    new DynamicCheckbox({
      name: 'showAdvanced',
      label: 'Show Advanced Options',
      value: false
    }),
    new DynamicDatepicker({
      name: 'birthDate',
      label: 'Date of Birth',
      relations: [
        {
          actionType: RelationActionType.VISIBLE,
          conditions: [{ fieldName: 'showAdvanced', value: (v: boolean) => !!v }]
        }
      ]
    }),
    new DynamicTextarea({
      name: 'bio',
      label: 'Short Biography',
      rows: 4,
      maxLength: 500,
      relations: [
        {
          actionType: RelationActionType.VISIBLE,
          conditions: [{ fieldName: 'showAdvanced', value: (v: boolean) => !!v }]
        }
      ]
    }),

    // 4. Reactive Logic Example
    new DynamicSelect({
      name: 'referralSource',
      label: 'How did you hear about us?',
      options: [
        { label: 'Google', value: 'google' },
        { label: 'Social Media', value: 'social' },
        { label: 'Other', value: 'other' }
      ]
    }),
    new DynamicInput({
      name: 'referralOther',
      label: 'Please specify',
      relations: [
        {
          actionType: RelationActionType.ENABLED,
          conditions: [{ fieldName: 'referralSource', value: (v: string) => v === 'other' }]
        },
        {
          actionType: RelationActionType.VISIBLE,
          conditions: [{ fieldName: 'referralSource', value: (v: string) => v === 'other' }]
        }
      ]
    })
  ];

  public layout: string[] = [
    'showcase-intro',
    'identity-header',
    'firstName lastName',
    'email',
    'password',
    'preferences-header',
    'theme enableNotifications',
    'language',
    'showAdvanced',
    'birthDate',
    'bio',
    'referralSource referralOther',
    'submitBtn resetBtn logBtn'
  ];

  public formGroup: FormGroup = this.dynamicFormService.createFormGroup(this.config);

  public onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form Submitted!', this.formGroup.value);
      alert('Success! Check console for form values.');
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public logForm() {
    console.log(this.formGroup);
  }
}
