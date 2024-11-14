import { AsyncPipe, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicButtonToggles } from './dynamic-button-toggles.model';

@Component({
  standalone: true,
  imports: [NgFor, MatButtonToggleModule, ReactiveFormsModule, AsyncPipe],
  selector: 'app-dynamic-button-toggles',
  templateUrl: './dynamic-button-toggles.component.html'
})
export class DynamicButtonTogglesComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicButtonToggles;
  @Input() group!: UntypedFormGroup;

  @Output() change: EventEmitter<MatButtonToggleChange> = new EventEmitter();
}
