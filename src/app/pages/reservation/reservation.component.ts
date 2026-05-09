import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  DynamicDatetimepicker,
  DynamicFormComponent,
  DynamicFormConfig,
  DynamicFormService,
  DynamicFormValidators,
  DynamicInput,
  RelationActionType
} from 'ngx-dynamic-form';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, DynamicFormComponent],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  private dynamicFormService = inject(DynamicFormService);

  public config: DynamicFormConfig = [
    new DynamicInput({
      name: 'firstName',
      label: 'First Name',
      validators: [DynamicFormValidators.required()]
    }),
    new DynamicInput({
      name: 'lastName',
      label: 'Last Name',
      validators: [DynamicFormValidators.required()],
      relations: [
        {
          actionType: RelationActionType.OPTIONAL,
          conditions: [{ fieldName: 'firstName', value: (v: string) => v === 'Olaf' }]
        }
      ]
    }),
    new DynamicDatetimepicker({
      name: 'reservationDate',
      labelDate: 'Date',
      labelTime: 'Time',
      min: new Date(),
      max: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      startAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      validators: [DynamicFormValidators.required()],
      relations: [
        {
          actionType: RelationActionType.OPTIONAL,
          conditions: [{ fieldName: 'firstName', value: (v: string) => v === 'Olaf' }]
        }
      ]
    })
  ];

  public layout: string[] = ['firstName lastName', 'reservationDate'];

  public formGroup = this.dynamicFormService.createFormGroup(this.config);

  public onSubmit() {
    console.log(this.formGroup.value);
  }

  public logForm() {
    console.log(this.formGroup.value);
  }
}
