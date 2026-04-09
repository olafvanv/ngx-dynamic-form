import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicButton } from './dynamic-button.model';

@Component({
  imports: [MatButtonModule],
  selector: 'dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrl: './dynamic-button.component.scss'
})
export class DynamicButtonComponent extends DynamicFormFieldBase<DynamicButton> {
  public model = input.required<DynamicButton>();
  public group = input.required<FormGroup>();

  public onClick() {
    this.model().clicked();
  }
}
