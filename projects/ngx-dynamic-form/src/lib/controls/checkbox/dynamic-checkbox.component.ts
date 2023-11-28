import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormFieldComponent } from '../../models/dynamic-form-field.model';
import { DynamicCheckbox } from './dynamic-checkbox.model';

@Component({
  selector: 'dynamic-checkbox',
  templateUrl: 'dynamic-checkbox.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule]
})
export class DynamicCheckboxComponent extends DynamicFormFieldComponent {
  @Input() model!: DynamicCheckbox;
  @Input() group!: UntypedFormGroup;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<MatCheckboxChange> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
}
