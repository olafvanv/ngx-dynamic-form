import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicReadonly } from './dynamic-readonly.model';

@Component({
    imports: [ReactiveFormsModule],
    selector: 'dynamic-readonly',
    templateUrl: './dynamic-readonly.component.html',
    styleUrls: ['./dynamic-readonly.component.scss']
})
export class DynamicReadonlyComponent extends DynamicFormFieldBase {
  @Input() model!: DynamicReadonly;
  @Input() group!: UntypedFormGroup;
}
