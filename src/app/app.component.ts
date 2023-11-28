import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DynamicCheckbox, DynamicFormConfig } from 'ovv-dynamic-form';
import { DynamicInput } from 'projects/ovv-dynamic-form/src/lib/controls/input/dynamic-input.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public formConfig: DynamicFormConfig = [
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

  public formGroup!: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {}

  onDynamicFormReady(form: UntypedFormGroup) {
    console.log(form);
  }
}
