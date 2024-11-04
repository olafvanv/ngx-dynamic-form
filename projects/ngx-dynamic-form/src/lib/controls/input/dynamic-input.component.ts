import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DynamicFormFieldBaseComponent } from '../../models/classes/dynamic-form-field-base-component';
import { DynamicInput } from './dynamic-input.model';

@Component({
  selector: 'dynamic-input',
  templateUrl: 'dynamic-input.component.html',
  styles: ['mat-form-field {width: 100%;}'],
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class DynamicInputComponent extends DynamicFormFieldBaseComponent {
  @ViewChild(MatInput, { static: true }) input!: MatInput;

  @Input() model!: DynamicInput;
  @Input() group!: UntypedFormGroup;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  get valueCount(): number {
    return this.input?.value ? this.input.value.length : 0;
  }

  get maxCountText(): string {
    return `${this.valueCount} / ${this.model.maxLength}`;
  }

  get showClear(): boolean {
    return !!this.control.value && !this.control.disabled;
  }
}
