# NgxDynamicForm

This library is to create a form based on a JSON model. The forms is based on the `ReactiveFormsModule` from Angular and contains a set of pre-built form controls using the Angular Material library. Using the built-in form controls is optional, you can use your own components to use as form controls inside the dynamic form. See [Custom Form Controls](#custom-form-controls) form more information.

## Table of contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Validators](#validators)
  - [Built-in validators](#built-in-validators)
  - [Custom validators](#custom-validators)
- [Relations](#relations)
  - [Action type](#action-type)
  - [Conditions](#conditions)
  - [Operator](#operator)
- [Custom Form Controls](#custom-form-controls)

## Getting started

##### 1. Make sure to install and configure [Angular Material](https://material.angular.io/guide/getting-started) if you want to use the built-in form controls

##### 2. Install the library using npm:

```
npm i --save @olafvv/ngx-dynamic-form
```

## Usage

##### 1. Import the (standalone) component

```ts
import { DynamicFormComponent } from 'olafvv/ngx-dynamic-form';

@NgModule({
  //...
  imports: [DynamicFormComponent]
  //...
})
export class AppModule {}
```

**Or when using a standalone application/components:**

```ts
import { DynamicFormComponent } from '@olafvv/ngx-dynamic-form';

@Component({
  standalone: true,
  imports: [DynamicFormComponent]
  //...
})
export class AppComponent {
  //...
}
```

##### 2. Define your form configuration

Create the JSON configuration for the form. This is a two-dimensional array where each array is a row in the form. So if you want multiple fields next to each other, define them in a single array. See [Form layout](#form-layout) for more information.

```ts
import { DynamicInput, DynamicTextarea, DynamicFormValidators } from '@olafvv/ngx-dynamic-form';

export const SAMPLE_FORM: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'name',
      inputType: 'text',
      label: 'Name'
    })
  ],
  [
    new DynamicInput({
      name: 'email',
      inputType: 'email',
      label: 'Email address'
    })
  ],
  [
    new DynamicTextarea({
      name: 'message',
      label: 'Your message',
      maxLength: 200,
      rows: 5
    })
  ]
];
```

##### 3. Create a FormGroup

This library provides the service `DynamicFormService` which you can use to create a FormGroup based on the created form configuration.

```ts
import { SAMPLE_FORM } from './sample-form.ts';
import { DynamicFormService } from '@olafvv/ngx-dynamic-form;

@Component({
  //...
})
export class AppComponent {
  sampleFormConfig: DynamicFormConfig = SAMPLE_FORM;
  sampleFormGroup: FormGroup<SampleFormModel> = this.dynamicFormService.createFormGroup(this.sampleFormConfig);

  constructor(private dynamicFormService: DynamicFormService) {}
}
```

##### 4. Add the `dynamic-form` inside the template

To add the form to your template, you have to use the selector `<dynamic-form></dynamic-form>` and pass the FormGroup and configuration as inputs:

```html
<form [formGroup]="sampleFormGroup">
  <dynamic-form [group]="sampleFormGroup" [formConfig]="sampleFormConfig">
</form>
```

## Validators

This library comes with a set of built-in validators, based on the [Angular Validators](https://angular.dev/api/forms/Validators). All provided validators are static methods inside the class `DynamicFormValidators`, each returning a `DynamicFormValidator` (e.g. `DynamicFormValidators.required()`).

To use the validators, pass them inside the validators array of the field configuration:

```ts
import { DynamicFormValidators } from '@olafvv/ngx-dynamic-form';

export const SAMPLE_FORM = [
  [
    new DynamicFormInput({
      //..
      validators: [DynamicFormValidators.required('Custom error message')]
    })
  ]
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

Adding a custom validator is quite straightforward. All you have to do is to provide an object of the type `DynamicFormValidator` to the validators array of a field with a (unique) name, validatorFn and errorMessage.

Read more about creating custom Angular validators on the following page:

> https://blog.angular-university.io/angular-custom-validators/

E.g. a validator to require a minimum time:

```ts
function minTimeValidatorFn(minTime: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputTime = control.value as string;

    if (!inputTime) return null;

    const minTimeObj = new Date(`2000-01-01T${minTime}`);
    const inputTimeObj = new Date(`2000-01-01T${inputTime}`);

    return inputTimeObj >= minTimeObj ? null : { minTime: true };
  };
}

export const minTimeValidator: (minTime: string, msg?: string) => DynamicFormValidator = (minTime: string, msg?: string) => ({
  name: 'minTime',
  validator: minTimeValidatorFn(minTime),
  message: msg ?? `Minimale tijd is ${minTime}`
});
```

```ts
import { minTimeValidator } from './min-time-validator.ts';

//..

const formConfig: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'time',
      inputType: 'time',
      validators: [minTimeValidator('11:00')]
    })
  ]
];
```

## Relations

Sometimes you want to create certain connections between fields in a form to control their state, based on the value of the other field. This library provides a way to configure these connections,called relations.

Each relation is defined on the field that requires a specific state based on one or more conditions. Each relation, a `DynamicFormFieldRelation`, contains an actionType, one or more condition(s) and optionally an operator.

```ts
interface DynamicFormFieldRelation {
  actionType: RelationActionType;
  conditions: RelationCondition[];
  operator?: RelationOperator;
}
```

##### Action type

The action type is the type of state the field should be when the conditions are met. Right now the library contains three different action types:

- Disable/Enable
- Visible/Hidden
- Required/Optional

To set the type you have to use one of the provided enums:

```ts
enum RelationActionType {
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE',
  REQUIRED = 'REQUIRED',
  OPTIONAL = 'OPTIONAL'
}
```

##### Conditions

The conditions is an array of `RelationCondition` objects. Each condition contains the name of the field the related field is depended on and a value when the condition is met:

```ts
interface RelationCondition {
  // The name of the field this field is related to
  fieldName: string;
  // A method which has to return a boolean. Returning true means the condition is met
  value: (val: any) => boolean;
}
```

##### Operator

The operator is an optional property and determines if all or any one of the conditions have to return true to trigger the required state of the field. By default the value of this property is `RelationOperator.AND` and is only used when there are more than 1 conditions.

```ts
enum RelationOperator {
  // All conditions have to equal true
  AND = 'AND',
  // On of the conditions have to equal true
  OR = 'OR'
}
```

##### Example

Here is an example of a field called 'passportNumber' which has to be visible when the value of the field named 'documentType' equals to 'passport':

```ts
const formConfig = [
  [
    new DynamicSelect({
      name: 'documentType',
      label: 'Document type',
      options: [
        { label: 'Passport', value: 'passport' }
        //..
      ]
    })
  ][
    new DymamicInput({
      name: 'passportNumber',
      label: 'Passport number',
      relations: [
        {
          actionType: RelationActionType.VISIBLE,
          conditions: [
            {
              fieldName: 'documentType',
              value: (val: string) => val === 'passport'
            }
          ]
        }
      ]
    })
  ]
];
```

## Built-in form controls

The library comes with a set of built-in form controls, using the Angular Material library. To make use of these you have to make sure to install and configure [Angular Material](https://material.angular.io).

The library comes with the following form controls:

| Form control name | Description                                                                                                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Button            | Shows a button inside the form. Can be provided with a label and/or icon. You also provide a callback method for what happens when the button is clicked                        |
| Button toggle     | Based on the Angular Material component which shows a row of buttons, each holding a value (can be compared to radio buttons). It is possible to select one or multiple options |
| Checkbox          | Shows a checkbox, indicating a true or false value                                                                                                                              |
| Input             | Text based input using the HTML5 input element with Angular Material styling and animations.                                                                                    |
| Radio group       | Uses the `mat-radio-group` of Angular Material to show a group of radio buttons to select a single option                                                                       |
| Readonly          | Shows the value of the control without the possibility to interact with it.                                                                                                     |
| Select            | Uses the `mat-select` of Angular Material to show a list of options inside a dropdown.                                                                                          |
| Textarea          | The HTML5 `<textarea>` element with enchanced Angular Material styling and animations.                                                                                          |

Each control has a basic set of properties (see `DynamicFormFieldConfig`) that can be passed to the control's model. They also have a specific set of properties that only apply to the selected control.

## Custom Form Controls

Other than the build-in form controls, it is possible to plug in you own custom controls. Start out with creating a custom form control component:

> https://blog.angular-university.io/angular-custom-form-controls/

After that follow the following steps.

#### 1. Create a model

First step is to create a model and interface for the custom control containing the control specific properties for the configuration definitions, extending the base interface/model from the library.
Also, you need to create an (unique) name for the type of the model/.

For example if you're creating a control with a slider to select a value between 0 and 10:

##### Interface:

The interface extends the base interface `DynamicFormFieldValueConfig` and expects a generic type describing the possible value(s) of the field. In this case that would be a number or null value.

```typescript
export interface SliderInputConfig extends DynamicFormFieldValueConfig<number | null> {
  min: number;
  max: number;
  step: number;
}
```

#### Model

The model is what is called when creating the form config (e.g. `new SliderInput(sliderConfig)`).
The model contains the same properties defined in the configuration interface, and provides them with a value from the config or a default value.

Also, you need to create a field type token which we can later use to map the used model to the control component. In this case we created the token with the name `DYNAMIC_FORM_FIELD_SLIDER` with the value `slider`. The value HAS to be unique.

```typescript
export const DYNAMIC_FORM_FIELD_SLIDER = 'slider';

export class SliderInput extends DynamicFormFieldValueModel<number | null> {
  public min: number;
  public max: number;
  public step: number;

  readonly type = DYNAMIC_FORM_FIELD_SLIDER;

  constructor(config: SliderInputConfig) {
    super(config);

    this.min = config.min ?? 0;
    this.max = config.max ?? 10;
    this.step = config.step ?? 1;
  }
}
```
