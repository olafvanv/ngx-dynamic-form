import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormFieldBaseComponent } from '../../models/classes/dynamic-form-field-base-component';
import { DynamicButton } from './dynamic-button.model';

@Component({
  standalone: true,
  imports: [NgIf, MatButtonModule],
  selector: 'dynamic-button',
  templateUrl: './dynamic-button.component.html'
})
export class DynamicButtonComponent extends DynamicFormFieldBaseComponent {
  @Input() model!: DynamicButton;
  @Input() group!: UntypedFormGroup;

  public onClick() {
    this.model.onClick();
  }
}
