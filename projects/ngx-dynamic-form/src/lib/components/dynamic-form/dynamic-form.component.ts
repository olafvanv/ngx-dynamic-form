import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicFormConfig } from '../../models/types/dynamic-form-config.type';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';

@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [NgFor, DynamicFormFieldComponent, ReactiveFormsModule]
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig!: DynamicFormConfig;

  @Output() ready: EventEmitter<UntypedFormGroup> = new EventEmitter();

  public group!: UntypedFormGroup;

  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit() {
    this.group = this.dynamicFormService.createFormGroup(this.formConfig);
    this.ready.emit(this.group);
  }
}
