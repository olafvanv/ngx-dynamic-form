import { Component, input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Subscription } from 'rxjs';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicDatetimepicker } from './dynamic-datetimepicker.model';

export class DatetimeErrorStateMatcher implements ErrorStateMatcher {
  constructor(private parentControl: AbstractControl) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const isTouchedOrDirty = control?.touched || control?.dirty || this.parentControl?.touched || this.parentControl?.dirty;

    return !!(this.parentControl && this.parentControl.invalid && (isTouchedOrDirty || isSubmitted));
  }
}

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTimepickerModule],
  selector: 'dynamic-datetimepicker',
  templateUrl: './dynamic-datetimepicker.component.html',
  styleUrl: './dynamic-datetimepicker.component.scss'
})
export class DynamicDatetimepickerComponent extends DynamicFormFieldBase<DynamicDatetimepicker> implements OnInit, OnDestroy {
  public model = input.required<DynamicDatetimepicker>();
  public group = input.required<FormGroup>();
  public matcher!: DatetimeErrorStateMatcher;
  public isRequired = false;

  public internalGroup = new FormGroup({
    date: new FormControl<Date | string | null>(null),
    time: new FormControl<Date | string | null>(null)
  });

  private subs = new Subscription();

  ngOnInit() {
    const parentControl = this.control;

    if (parentControl) {
      this.matcher = new DatetimeErrorStateMatcher(parentControl);

      const initialVal = parentControl.value;

      if (initialVal) {
        const d = new Date(initialVal);

        if (!isNaN(d.getTime())) {
          this.internalGroup.patchValue(
            {
              date: d,
              time: d
            },
            { emitEvent: false }
          );
        }
      }

      this.subs.add(
        this.internalGroup.valueChanges.subscribe((val) => {
          const date = val.date;
          const time = val.time;

          if (!date && !time) {
            parentControl.setValue(null, { emitEvent: false });
          } else if (date && time) {
            const d = new Date(date);
            if (time instanceof Date) {
              d.setHours(time.getHours(), time.getMinutes(), 0, 0);
            } else if (typeof time === 'string') {
              const [hours, minutes] = time.split(':');
              d.setHours(parseInt(hours, 10));
              d.setMinutes(parseInt(minutes, 10));
            }
            parentControl.setValue(d, { emitEvent: false });
          } else {
            // If only one is filled, we don't set a valid combined date, or we could set null
            parentControl.setValue(null, { emitEvent: false });
          }

          // Trigger validation on parent
          parentControl.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        })
      );

      // Listen to external changes (e.g. formGroup.patchValue(...))
      this.subs.add(
        parentControl.valueChanges.subscribe((val) => {
          if (val) {
            const d = new Date(val);
            if (!isNaN(d.getTime())) {
              this.internalGroup.patchValue({ date: d, time: d }, { emitEvent: false });
            }
          } else {
            this.internalGroup.patchValue({ date: null, time: null }, { emitEvent: false });
          }
        })
      );

      // Listen to status changes to see if validations (like required) have changed
      this.isRequired = parentControl.hasValidator(Validators.required);
      this.subs.add(
        parentControl.statusChanges.subscribe(() => {
          this.isRequired = parentControl.hasValidator(Validators.required);
        })
      );

      // Add a validator to ensure that if one field is filled, the other must be too
      parentControl.addValidators(this.datetimeIncompleteValidator.bind(this));
      parentControl.updateValueAndValidity({ emitEvent: false });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private datetimeIncompleteValidator(): ValidationErrors | null {
    const date = this.internalGroup.get('date')?.value;
    const time = this.internalGroup.get('time')?.value;

    // If only one is filled, it's incomplete
    if ((date && !time) || (!date && time)) {
      return { required: true };
    }
    return null;
  }
}
