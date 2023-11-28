import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormFieldComponent } from '../../models/dynamic-form-field.model';
import { DynamicInput } from './dynamic-input.model';

@Component({
  selector: 'dynamic-input',
  templateUrl: 'dynamic-input.component.html',
  styles: ['mat-form-field {width: 100%;}'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class DynamicInputComponent extends DynamicFormFieldComponent {
  @Input() model!: DynamicInput;
  @Input() group!: UntypedFormGroup;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
}
