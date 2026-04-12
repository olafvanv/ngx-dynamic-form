# NgxDynamicForm 🚀

[![Angular Version](https://img.shields.io/badge/Angular-17.1%2B-red)](https://angular.io/)
[![Npm Version](https://img.shields.io/npm/v/@olafvv/ngx-dynamic-form)](https://www.npmjs.com/package/@olafvv/ngx-dynamic-form)

**NgxDynamicForm** is a modern, strongly-typed, and highly performant library for dynamically generating Reactive Forms based on a JSON-like configuration model.

Leveraging cutting-edge Angular features like **Strict Typed Forms** and **Signal Inputs**, this library gives you top-tier developer experience without the boilerplate. Use our polished Angular Material built-in controls out of the box, or easily plug in your own custom fields!

![NgxDynamicForm Showcase](https://via.placeholder.com/800x400.png?text=Interactive+Form+Animation+Here)

> _Tip: Replace the placeholder above with a GIF of the dynamic form in action!_

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](#) _(Link this to a live playground playground once deployed!)_

---

## 📖 Table of contents

- [Getting Started](#getting-started)
- [Basic Usage (3 Steps)](#usage)
- [Layout](#layout)
- [Field Width Control](#field-width-control)
- [Validators](#validators)
- [Relations (Conditional Logic)](#relations)
- [Built-in Form Controls](#built-in-form-controls)
- [Creating Custom Form Controls](#custom-form-controls)

---

## Getting started

##### 1. Configure Angular Material

Make sure to install and configure [Angular Material](https://material.angular.io/guide/getting-started) if you want to use the built-in form controls.

##### 2. Install the library

```bash
npm i --save @olafvv/ngx-dynamic-form
```

---

## Usage

##### 1. Import the standalone component

```ts
import { DynamicFormComponent } from '@olafvv/ngx-dynamic-form';

@Component({
  standalone: true,
  imports: [DynamicFormComponent, ReactiveFormsModule]
  //...
})
export class AppComponent {}
```

##### 2. Define your form configuration

Create an array of field models. Each model describes a single field — its type, label, validators, and any conditional logic.

```ts
import { DynamicInput, DynamicTextarea, DynamicStaticText, DynamicFormConfig } from '@olafvv/ngx-dynamic-form';

export const SAMPLE_FORM: DynamicFormConfig = [
  new DynamicStaticText({
    name: 'intro',
    value: {
      title: 'Contact Information',
      text: 'Please fill in your details below.'
    }
  }),
  new DynamicInput({
    name: 'name',
    inputType: 'text',
    label: 'Name'
  }),
  new DynamicTextarea({
    name: 'message',
    label: 'Your message',
    maxLength: 200,
    rows: 5
  })
];
```

##### 3. Create the Form & Render it!

Use the library's `DynamicFormService` to generate a strict, reactive `FormGroup` and pass tis `FormGroup` and the configuration to the `<dynamic-form>` component inside the template.

```ts
import { Component, inject } from '@angular/core';
import { DynamicFormService, DynamicFormConfig } from '@olafvv/ngx-dynamic-form';
import { SAMPLE_FORM } from './sample-form';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <form [formGroup]="formGroup">
      <!-- 🚀 Render the dynamic form dynamically! -->
      <dynamic-form
        [group]="formGroup"
        [formConfig]="formConfig" />
    </form>
  `
})
export class MyFormComponent {
  private dynamicFormService = inject(DynamicFormService);

  formConfig: DynamicFormConfig = SAMPLE_FORM;
  formGroup = this.dynamicFormService.createFormGroup(this.formConfig);
}
```

---

## Layout

By default, fields are stacked vertically — one per row. To arrange fields side-by-side, pass a `layout` input to `<dynamic-form>`. Each string in the array represents one **row**, containing space-separated field `name` values.

```ts
// component.ts
layout: string[] = [
  'firstName lastName',   // two fields side-by-side
  'email',                // full-width
  'street city zip',      // three fields in a row
];
```

```html
<!-- component.html -->
<dynamic-form
  [group]="formGroup"
  [formConfig]="formConfig"
  [layout]="layout" />
```

Fields not referenced in the layout are not rendered. Fields within a row share available space equally by default.

---

## Field Width Control

Field widths are controlled via **CSS custom properties**, keeping presentation cleanly separated from data configuration. Each field exposes a CSS variable named `--field-{name}-width`.

Since `<dynamic-form>` is rendered in your own component's template, you can set these variables from your component's scoped stylesheet — no `::ng-deep` or global styles required.

```scss
// my-form.component.scss
dynamic-form {
  --field-postcode-width: 25%; // postcode takes 25%
  // street fills the remaining 75% automatically
}
```

This approach also works natively with `@media` queries for fully responsive layouts:

```scss
dynamic-form {
  --field-postcode-width: 25%;

  @media (max-width: 600px) {
    --field-postcode-width: 100%; // stack on mobile
  }
}
```

---

## Validators

This library comes with a set of built-in formatters mapped seamlessly to standard [Angular Validators](https://angular.dev/api/forms/Validators). They are provided via static methods inside `DynamicFormValidators` (e.g. `DynamicFormValidators.required()`).

```ts
import { DynamicFormValidators } from '@olafvv/ngx-dynamic-form';

export const SAMPLE_FORM: DynamicFormConfig = [
  new DynamicInput({
    name: 'email',
    inputType: 'email',
    validators: [DynamicFormValidators.required('Email address is required!'), DynamicFormValidators.email('Please provide a valid email')]
  })
];
```

#### Built-in validators

Each validator has at least the optional parameter for a custom error message. If you don't provided one, the library will place a generic error message (e.g. for required: 'This field is required').

```ts
class DynamicFormValidators {
  // Validator that requires the control's value to be less than or equal to the provided number.
  static email(errorMessage?: string): DynamicFormValidator;
  // Validator that requires the control's value to be greater than or equal to the provided number.
  static min(min: number, errorMessage?: string): DynamicFormValidator;
  // Validator that requires the control's value to be less than or equal to the provided number.
  static max(max: number, errorMessage?: string): DynamicFormValidator;
  // Validator that requires the length of control's value to be greater than or equal to the provided number.
  static minLength(min: number, errorMessage?: string): DynamicFormValidator;
  // Validator that requires the length of control's value to be less than or equal to the provided number.
  static maxLength(max: number, errorMessage?: string): DynamicFormValidator;
  // Validator that requires the control's value to match the provided pattern.
  static pattern(pattern: string | RexExp, errorMessage?: string): DynamicFormValidator;
  // Validator that requires the control to have a non-empty value.
  static required(errorMessage?: string): DynamicFormValidator;
  // Validator that requires the control's value to be true.
  static requiredTrue(errorMessage?: string): DynamicFormValidator;
}
```

#### Custom Validators

You can easily provide custom validation logic by passing an object of type `DynamicFormValidator` into the `validators` property.

```ts
export const minTimeValidator: (minTime: string, msg?: string) => DynamicFormValidator = (minTime: string, msg?: string) => ({
  name: 'minTime',
  validator: minTimeValidatorFn(minTime), // Your custom function returning an Angular ValidationErrors object
  message: msg ?? `Minimum time allowed is ${minTime}`
});
```

---

## Relations

Sometimes you want to create interconnected logic between fields (e.g., hiding a passport number input unless the document type is set to "Passport"). NgxDynamicForm handles conditionally reactive states natively using **Relations**.

Each relation defines an Action Type, a source condition, and an operator.

##### DynamicFormFieldRelation type

```ts
type DynamicFormFieldRelation {
  actionType: RelationActionType;
  conditions: RelationCondition[];
  operator?: RelationOperator;
}
```

##### Action Types

- `DISABLED` / `ENABLED`
- `HIDDEN` / `VISIBLE`
- `REQUIRED` / `OPTIONAL`

##### Example: Conditional Visibility

```ts
const formConfig: DynamicFormConfig = [
  new DynamicSelect({
    name: 'documentType',
    label: 'Document type',
    options: [
      { label: 'Passport', value: 'passport' },
      { label: 'ID Card', value: 'id' }
    ]
  }),
  new DynamicInput({
    name: 'passportNumber',
    label: 'Passport number',
    relations: [
      {
        actionType: RelationActionType.VISIBLE, // Make this field visible...
        conditions: [
          {
            fieldName: 'documentType', // ...when 'documentType' field...
            value: (val: string) => val === 'passport' // ...equals 'passport'
          }
        ]
      }
    ]
  })
];
```

---

## Built-in form controls

The library comes with a battle-tested set of built-in form controls utilizing **Angular Material**.

| Control Name      | Description                                                                           |
| :---------------- | :------------------------------------------------------------------------------------ |
| **Autocomplete**  | Advanced input with support for local filtering and async search functions.           |
| **Button**        | Highly-customizable actionable button with a click callback.                          |
| **Button toggle** | Horizontal toggle groupings ideal for single or multi-select radio behavior.          |
| **Checkbox**      | Standard binary state checkbox.                                                       |
| **Slide toggle**  | Standard binary state slide toggle.                                                   |
| **Input**         | Standard HTML5 inputs with embedded floating labels, validation hints, and matchings. |
| **Radio group**   | Vertically or horizontally stacked radio selectors.                                   |
| **Readonly**      | Presentational un-editable field representation.                                      |
| **Static Text**   | Presentational text for titles and/or descriptions.                                   |
| **Select**        | Dropdown menu powered by `mat-select` or native `<select>`.                           |
| **Textarea**      | Auto-resizing text area input.                                                        |

---

## Custom Form Controls

NgxDynamicForm was built with modern extensibility in mind. Creating a brand new dynamic control is easy using the generic `DynamicFormFieldBase<M>` abstraction.

### 1. Create a Model & Options Type

First, define a type for your specific options and a model class that Angular will parse.

```typescript
import { DynamicFormFieldValueConfig, DynamicFormFieldValueModel } from '@olafvv/ngx-dynamic-form';

export type SliderInputConfig = DynamicFormFieldValueConfig<number | null> & {
  min?: number;
  max?: number;
  step?: number;
};

export const DYNAMIC_FORM_FIELD_SLIDER = 'slider';

export class SliderInput extends DynamicFormFieldValueModel<number | null> {
  public min: number;
  public max: number;
  public step: number;
  public readonly type = DYNAMIC_FORM_FIELD_SLIDER;

  constructor(config: SliderInputConfig) {
    super(config);
    this.min = config.min ?? 0;
    this.max = config.max ?? 10;
    this.step = config.step ?? 1;
  }
}
```

### 2. Create the Strongly-Typed Component

Because this library uses **Angular 17+ Signal Inputs**, your custom component should extend `DynamicFormFieldBase` natively.

**`slider.component.ts`**:

```typescript
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldBase } from '@olafvv/ngx-dynamic-form';
import { SliderInput } from './slider-input.model';

@Component({
  standalone: true,
  selector: 'app-custom-slider',
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="slider-wrapper"
      [formGroup]="group()">
      <label>{{ model().label }}</label>

      <!-- Your custom markup here -->
      <input
        type="range"
        [min]="model().min"
        [max]="model().max"
        [step]="model().step"
        [formControlName]="model().name" />
    </div>
  `
})
// Notice how passing `SliderInput` strictly types the generic base class!
export class SliderComponent extends DynamicFormFieldBase<SliderInput> {
  public model = input.required<SliderInput>();
  public group = input.required<FormGroup>();
}
```

### 3. Registering the Control

Finally, tell the `DynamicFormService` how to connect the `SliderInput` model (`slider`) to the `SliderComponent` rendering engine via dependency injection using `DYNAMIC_FORM_CONTROL_MAP`.

```ts
@NgModule({
  ...
  providers: [
    {
      provide: DYNAMIC_FORM_FIELD_MAP,
      useValue: {
        [DYNAMIC_FORM_FIELD_SLIDER]: SliderComponent
      }
    }
  ]
})
export class AppModule {}

```
