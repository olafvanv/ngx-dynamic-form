import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicButtonToggles } from './dynamic-button-toggles.model';

@Component({
    imports: [NgIf, NgClass, MatButtonToggleModule, ReactiveFormsModule, AsyncPipe, MatFormFieldModule],
    selector: 'dynamic-button-toggles',
    templateUrl: './dynamic-button-toggles.component.html',
    styleUrls: ['./dynamic-button-toggles.component.scss']
})
export class DynamicButtonTogglesComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicButtonToggles;
  @Input() group!: UntypedFormGroup;

  @Output() change: EventEmitter<MatButtonToggleChange> = new EventEmitter();
}
