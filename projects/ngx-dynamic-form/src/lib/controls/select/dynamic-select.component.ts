import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicSelect } from './dynamic-select.model';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, AsyncPipe, MatInputModule],
  selector: 'dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss']
})
export class DynamicSelectComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicSelect<string>;
  @Input() group!: UntypedFormGroup;

  @Output() change = new EventEmitter<MatSelectChange>();
}
