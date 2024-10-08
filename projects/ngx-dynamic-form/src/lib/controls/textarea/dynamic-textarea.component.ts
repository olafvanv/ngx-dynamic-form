import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DynamicFormFieldBaseComponent } from '../../models/dynamic-form-field-base-component.model';
import { DynamicTextarea } from './dynamic-textarea.model';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  selector: 'app-dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
  styles: ['mat-form-field {width: 100%;}']
})
export class DynamicTextareaComponent extends DynamicFormFieldBaseComponent {
  @ViewChild(MatInput, { static: true }) textarea!: MatInput;

  @Input() model!: DynamicTextarea;
  @Input() group!: UntypedFormGroup;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();

  get valueCount(): number {
    return this.textarea?.value ? this.textarea.value.length : 0;
  }

  get maxCountText(): string {
    return `${this.valueCount} / ${this.model.maxLength}`;
  }
}
