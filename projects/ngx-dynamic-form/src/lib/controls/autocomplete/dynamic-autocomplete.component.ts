import { AsyncPipe } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { DynamicFormFieldBase } from '../../models/classes/dynamic-form-field-base';
import { DynamicFormFieldOption } from '../../models/classes/dynamic-form-field-option-model';
import { DynamicAutocomplete } from './dynamic-autocomplete.model';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  selector: 'dynamic-autocomplete',
  templateUrl: './dynamic-autocomplete.component.html',
  styleUrls: ['./dynamic-autocomplete.component.scss']
})
export class DynamicAutocompleteComponent extends DynamicFormFieldBase<DynamicAutocomplete> implements OnInit {
  public model = input.required<DynamicAutocomplete>();
  public group = input.required<FormGroup>();

  public filteredOptions$!: Observable<DynamicFormFieldOption<unknown>[]>;
  public isLoading = signal(false);

  ngOnInit(): void {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(this.model().debounceTime),
      distinctUntilChanged(),
      tap(() => {
        if (this.model().searchFn) this.isLoading.set(true);
      }),
      switchMap((value) => this.getOptions(value)),
      tap(() => this.isLoading.set(false))
    );
  }

  private getOptions(value: unknown): Observable<DynamicFormFieldOption<unknown>[]> {
    const searchString = typeof value === 'string' ? value.toLowerCase() : '';

    if (this.model().searchFn) {
      return this.model().searchFn!(searchString);
    }

    return this.model().options$.pipe(
      map((options) => {
        if (this.model().filterFn) {
          return options.filter((opt) => this.model().filterFn!(searchString, opt));
        }
        return options.filter((opt) => opt.label.toLowerCase().includes(searchString));
      })
    );
  }

  /**
   * Used by mat-autocomplete to display the label of the selected option instead of the value.
   */
  public displayFn = (value: any): string => {
    if (!value) return '';

    if (this.model().displayFn) {
      return this.model().displayFn!(value);
    }

    return value;
  };
}
