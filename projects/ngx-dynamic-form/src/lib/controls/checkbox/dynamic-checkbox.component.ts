import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicCheckbox } from './dynamic-checkbox.model';

@Component({
  selector: 'dynamic-checkbox',
  templateUrl: 'dynamic-checkbox.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule]
})
export class DynamicCheckboxComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicCheckbox;
  @Input() group!: UntypedFormGroup;

  @Output() change: EventEmitter<MatCheckboxChange> = new EventEmitter();
}
