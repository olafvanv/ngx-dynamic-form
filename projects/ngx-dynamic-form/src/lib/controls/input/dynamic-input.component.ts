import { Component, computed, input, viewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicInput } from './dynamic-input.model';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  selector: 'dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss'
})
export class DynamicInputComponent extends DynamicFormFieldBase<DynamicInput> {
  public input = viewChild.required<MatInput>(MatInput);

  public model = input.required<DynamicInput>();
  public group = input.required<FormGroup>();

  public typeIsPassword = computed(() => this.model().inputType === 'password');
  public valueCount = computed(() => (this.input()?.value ? this.input().value.length : 0));
  public maxCountText = computed(() => `${this.valueCount()} / ${this.model().maxLength}`);
  public showClear = computed(() => !!this.valueCount() && !this.control.disabled && !this.model().showLoader);

  public togglePassword(): void {
    this.input().type = this.input().type === 'password' ? 'text' : 'password';
  }
}
