import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicButtonToggles } from './dynamic-button-toggles.model';

@Component({
  imports: [MatButtonToggleModule, ReactiveFormsModule, AsyncPipe, MatFormFieldModule],
  selector: 'dynamic-button-toggles',
  templateUrl: './dynamic-button-toggles.component.html',
  styleUrls: ['./dynamic-button-toggles.component.scss']
})
export class DynamicButtonTogglesComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicButtonToggles;
  @Input() group!: FormGroup;
}
