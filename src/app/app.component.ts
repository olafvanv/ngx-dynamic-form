import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig } from 'ngx-dynamic-form';
import { PERSOON_FORM, PersonFormModel } from './forms/persoon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public formConfig: DynamicFormConfig = PERSOON_FORM;
  public formGroup!: FormGroup<PersonFormModel>;

  constructor() {}

  ngOnInit(): void {}

  onDynamicFormReady(form: FormGroup<PersonFormModel>) {
    this.formGroup = form;
  }
}
