import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormConfig } from '../../models/types/dynamic-form-config.type';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { DynamicFormFieldComponent } from '../dynamic-form-field/dynamic-form-field.component';

@Component({
  imports: [DynamicFormFieldComponent, ReactiveFormsModule],
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [DynamicFormService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  public group = input.required<FormGroup>();
  public formConfig = input.required<DynamicFormConfig>();
  public layout = input<string[]>([]);

  public layoutRows = computed(() => {
    if (!this.layout()?.length) return null;

    return this.layout().map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((name) => this.formConfig().find((f) => f.name === name))
        .filter((f) => !!f)
    );
  });

  /**
   * Get the current value of the form.
   * @param includeDisabledFields Include the disabled fields of the form, is enabled by default
   */
  public getFormValue<T = unknown>(includeDisabledFields = true): T {
    const formValue = includeDisabledFields ? this.group().getRawValue() : this.group().value;

    return formValue;
  }

  /**
   * Provides an Observable to listen to changes of a specific field in the form.
   *
   * @param name Name of the field
   * @returns Observable<unknown>
   */
  public onControlChange(name: string): Observable<unknown> {
    const field = this.group().get(name);

    if (!field) {
      throw new Error(`Cannot find a field with the name ${name} in the FormGroup`);
    }

    return field.valueChanges;
  }
}
