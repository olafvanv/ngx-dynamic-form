import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormFieldBaseComponent } from '../../models/classes/dynamic-form-field-base-component';
import { DynamicSelect } from './dynamic-select.model';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, AsyncPipe, MatInputModule],
  selector: 'dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss']
})
export class DynamicSelectComponent extends DynamicFormFieldBaseComponent {
  @Input() model!: DynamicSelect<string>;
  @Input() group!: UntypedFormGroup;

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
}
