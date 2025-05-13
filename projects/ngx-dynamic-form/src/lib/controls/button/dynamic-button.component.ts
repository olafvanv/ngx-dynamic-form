import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicButton } from './dynamic-button.model';

@Component({
    imports: [MatButtonModule],
    selector: 'dynamic-button',
    templateUrl: './dynamic-button.component.html',
    styleUrl: './dynamic-button.component.scss'
})
export class DynamicButtonComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicButton;
  @Input() group!: UntypedFormGroup;

  public onClick() {
    this.model.onClick();
  }
}
