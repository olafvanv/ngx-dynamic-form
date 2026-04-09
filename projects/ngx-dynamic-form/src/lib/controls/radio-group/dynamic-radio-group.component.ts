import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicRadioGroup } from './dynamic-radio-group.model';

@Component({
  imports: [NgClass, ReactiveFormsModule, MatRadioModule, AsyncPipe],
  selector: 'dynamic-radio-group',
  templateUrl: './dynamic-radio-group.component.html',
  styleUrls: ['./dynamic-radio-group.component.scss']
})
export class DymamicRadioGroupComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicRadioGroup;
  @Input() group!: FormGroup;
}
