import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DynamicFormFieldComponent } from '../../models/dynamic-form-field.model';
import { isNumber } from '../../utils/methods.util';
import { DynamicInput } from './dynamic-input.model';

@Component({
  selector: 'dynamic-input',
  templateUrl: 'dynamic-input.component.html',
  styles: ['mat-form-field {width: 100%;}'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class DynamicInputComponent extends DynamicFormFieldComponent {
  @ViewChild(MatInput, { static: true }) input!: MatInput;

  @Input() model!: DynamicInput;
  @Input() group!: UntypedFormGroup;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  get showMaxCount(): boolean {
    return isNumber(this.model.maxLength) && this.model.showMaxLengthCount;
  }

  get valueCount(): number {
    return this.input?.value ? this.input.value.length : 0;
  }

  get maxCountText(): string {
    return `${this.valueCount} / ${this.model.maxLength}`;
  }
}
