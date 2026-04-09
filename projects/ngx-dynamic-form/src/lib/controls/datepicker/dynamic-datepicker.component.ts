import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicDatepicker } from './dynamic-datepicker.model';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  selector: 'dynamic-datepicker',
  templateUrl: './dynamic-datepicker.component.html',
  styleUrl: './dynamic-datepicker.component.scss'
})
export class DynamicDatepickerComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicDatepicker;
  @Input() group!: FormGroup;
}
