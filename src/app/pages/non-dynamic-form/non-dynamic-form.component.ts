import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

interface NonDynamicFormModel {
  name: FormControl<string | null>;
  age: FormControl<number | null>;
  isDutch: FormControl<boolean | null>;
  city: FormControl<string | null>;
}

@Component({
  selector: 'app-non-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './non-dynamic-form.component.html',
  styleUrls: ['./non-dynamic-form.component.scss']
})
export class NonDynamicFormComponent implements OnDestroy {
  form: FormGroup<NonDynamicFormModel> = this.fb.group({
    name: ['', [Validators.required]],
    age: [NaN],
    isDutch: [false],
    city: ['']
  });

  private subs = new Subscription();

  private conditions = [
    {
      validator: 'visible',
      control: 'city',
      dependedOn: [
        {
          name: 'isDutch',
          condition: (val: boolean) => val === true
        }
      ]
    },
    {
      control: 'city',
      conditions: [
        {
          validator: 'required'
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.form
      .get('isDutch')
      ?.valueChanges.pipe(takeUntilDestroyed())
      .subscribe((val) => {
        if (val) {
          this.form.get('city')?.setValidators(Validators.required);
        } else {
          this.form.get('city')?.removeValidators(Validators.required);
        }

        this.form.get('city')?.updateValueAndValidity({ onlySelf: true });
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
