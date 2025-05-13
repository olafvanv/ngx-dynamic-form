import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicRadioGroup } from './dynamic-radio-group.model';

@Component({
    imports: [NgIf, NgClass, ReactiveFormsModule, MatRadioModule, AsyncPipe],
    selector: 'dynamic-radio-group',
    templateUrl: './dynamic-radio-group.component.html',
    styleUrls: ['./dynamic-radio-group.component.scss']
})
export class DymamicRadioGroupComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicRadioGroup;
  @Input() group!: UntypedFormGroup;

  @Output() change = new EventEmitter<MatRadioChange>();
}
