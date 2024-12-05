import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicFormFieldEvent } from '../../models/interfaces/dynamic-form-field-event.interface';
import { DynamicInput } from './dynamic-input.model';

@Component({
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe
  ],
  selector: 'dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss'
})
export class DynamicInputComponent extends DynamicFormFieldBase {
  @ViewChild(MatInput, { static: true }) input!: MatInput;

  @Input() model!: DynamicInput;
  @Input() group!: UntypedFormGroup;

  @Output() change = new EventEmitter<DynamicFormFieldEvent>();

  get valueCount(): number {
    return this.input?.value ? this.input.value.length : 0;
  }

  get maxCountText(): string {
    return `${this.valueCount} / ${this.model.maxLength}`;
  }

  get showClear(): boolean {
    return !!this.control.value && !this.control.disabled && !this.model.showLoader;
  }

  public onChange(event: Event | DynamicFormFieldEvent): void {
    // Ignore the native HTML 5 change event
    if (event instanceof Event) {
      event.stopPropagation();
    }

    this.change.emit(event as DynamicFormFieldEvent);
  }
}
