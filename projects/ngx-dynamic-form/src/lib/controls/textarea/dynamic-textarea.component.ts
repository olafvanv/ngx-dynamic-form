import { Component, input, viewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicTextarea } from './dynamic-textarea.model';

@Component({
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  selector: 'dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
  styles: ['mat-form-field {width: 100%;}']
})
export class DynamicTextareaComponent extends DynamicFormFieldBase<DynamicTextarea> {
  public textarea = viewChild.required<MatInput>(MatInput);

  public model = input.required<DynamicTextarea>();
  public group = input.required<FormGroup>();

  get valueCount(): number {
    return this.textarea()?.value ? this.textarea().value.length : 0;
  }

  get maxCountText(): string {
    return `${this.valueCount} / ${this.model().maxLength}`;
  }
}
