import { inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DynamicButton,
  DynamicCheckbox,
  DynamicFormConfig,
  DynamicFormService,
  DynamicFormValidators,
  DynamicInput,
  DynamicReadonly,
  DynamicSelect,
  DynamicTextarea,
  RelationActionType,
  RelationOperator
} from 'ngx-dynamic-form';
import { DataService, Gender } from '../../services/data.service';
import { SliderInput } from '../../shared/slider-input/slider-input.model';
import { minTimeValidator } from './min-time.validator';

export interface PersonFormModel {
  firstname: FormControl<string | null>;
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  telefoon: FormControl<string | null>;
  sex: FormControl<boolean | null>;
}

export class Persoon {
  private _dataService = inject(DataService);
  private _dynamicFormService = inject(DynamicFormService);

  public formConfig: DynamicFormConfig = [
    [
      new DynamicInput({
        name: 'firstname',
        inputType: 'text',
        id: 'first-name',
        label: 'Voornaam',
        defaultValue: 'Olaf',
        maxLength: 40
      }),
      new DynamicInput({
        name: 'name',
        inputType: 'text',
        label: 'Achternaam'
      })
    ],
    [
      new DynamicInput({
        name: 'time',
        inputType: 'time',
        label: 'Tijd',
        validators: [minTimeValidator('11:00')]
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
        options: this._dynamicFormService.toDynamicOptionListObs<Gender, string>(
          this._dataService.getGenders(),
          (gender: Gender) => gender.name,
          (gender: Gender) => gender.value
        ),
        validators: [],
        relations: [
          {
            actionType: RelationActionType.REQUIRED,
            conditions: [
              {
                fieldName: 'agree',
                value: (val: boolean) => {
                  return val === true;
                }
              }
            ]
          }
        ]
      }),
      new DynamicSelect({
        name: 'gender-advanced',
        label: 'Gender v2',
        groupedOptions: [
          {
            name: 'Klassiek',
            options: [
              { value: 'M', label: 'Man' },
              { value: 'V', label: 'Vrouw' }
            ]
          },
          {
            name: 'Inclusief',
            options: [
              { value: 'X', label: 'Onbekend' },
              { value: 'XX', label: 'Gewenst niet aan te geven' }
            ]
          }
        ]
      })
    ],
    [
      new DynamicInput({
        name: 'parentName',
        label: 'Name of parent',
        hidden: true,
        relations: [
          {
            actionType: RelationActionType.REQUIRED,
            conditions: [
              {
                fieldName: 'age',
                value: (age: number) => !!age && age < 18
              }
            ]
          },
          {
            actionType: RelationActionType.VISIBLE,
            conditions: [
              {
                fieldName: 'age',
                value: (age: number) => !!age && age < 18
              }
            ]
          }
        ]
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
                value: (val: string) => val === 'Olaf'
              },
              {
                fieldName: 'gender',
                value: (val: string) => val === 'M'
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
        labelPosition: 'before'
      })
    ]
  ];
}
