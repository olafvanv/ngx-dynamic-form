import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicFormFieldEvent } from '../../models/interfaces/dynamic-form-field-event.interface';
import { DynamicTextarea } from './dynamic-textarea.model';

@Component({
  standalone: true,
  imports: [NgIf, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  selector: 'dynamic-textarea',
  templateUrl: './dynamic-textarea.component.html',
  styles: ['mat-form-field {width: 100%;}']
})
export class DynamicTextareaComponent extends DynamicFormFieldBase {
  @ViewChild(MatInput, { static: true }) textarea!: MatInput;

  @Input() model!: DynamicTextarea;
  @Input() group!: UntypedFormGroup;

  @Output() change = new EventEmitter<DynamicFormFieldEvent>();

  get valueCount(): number {
    return this.textarea?.value ? this.textarea.value.length : 0;
  }

  get maxCountText(): string {
    return `${this.valueCount} / ${this.model.maxLength}`;
  }

  public onChange(event: Event | DynamicFormFieldEvent): void {
    // Ignore the native HTML 5 change event
    if (event instanceof Event) {
      event.stopPropagation();
    }

    this.change.emit(event as DynamicFormFieldEvent);
  }
}
