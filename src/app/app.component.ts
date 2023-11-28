import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DynamicFormConfig } from 'ngx-dynamic-form';
import { PERSOON_FORM } from './forms/persoon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public formConfig: DynamicFormConfig = PERSOON_FORM;
  public formGroup!: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {}

  onDynamicFormReady(form: UntypedFormGroup) {
    console.log(form);
  }
}
