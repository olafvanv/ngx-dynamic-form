import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldBaseComponent } from '../../models/classes/dynamic-form-field-base-component';
import { DynamicReadonly } from './dynamic-readonly.model';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'dynamic-readonly',
  templateUrl: './dynamic-readonly.component.html',
  styleUrls: ['./dynamic-readonly.component.scss']
})
export class DynamicReadonlyComponent extends DynamicFormFieldBaseComponent {
  @Input() model!: DynamicReadonly;
  @Input() group!: UntypedFormGroup;
}
