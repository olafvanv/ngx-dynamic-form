import { Component, Input, ViewChild } from '@angular/core';
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
export class DynamicInputComponent extends DynamicFormFieldBase {
  @ViewChild(MatInput, { static: true }) input!: MatInput;

  @Input() model!: DynamicInput;
  @Input() group!: FormGroup;

  get valueCount(): number {
    return this.input?.value ? this.input.value.length : 0;
  }

  get maxCountText(): string {
    return `${this.valueCount} / ${this.model.maxLength}`;
  }

  get showClear(): boolean {
    return !!this.control.value && !this.control.disabled && !this.model.showLoader;
  }
}
