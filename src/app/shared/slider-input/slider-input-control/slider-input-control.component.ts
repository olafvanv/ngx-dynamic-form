import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';

@Component({
  selector: 'app-slider-input-control',
  templateUrl: 'slider-input-control.component.html',
  standalone: true,
  imports: [CommonModule, MatSliderModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SliderInputControl)
    }
  ]
})
export class SliderInputControl implements ControlValueAccessor {
  @Input()
  public min = 0;

  @Input()
  public max = 10;

  @Input()
  public step = 1;

  value: number | null = 5;
  disabled = false;
  touched = false;

  onChange = (number: number) => {};
  onTouched = () => {};

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (_: number | null) => void): void {
    console.log(this.value);

    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onAdd() {
    if (this.value && this.value < this.max) {
      this.value = this.value + this.step;
      this.onChange(this.value);
    }
  }

  onRemove() {
    if (this.value && this.value > this.min) {
      this.value = this.value - this.step;
      this.onChange(this.value);
    }
  }
}
