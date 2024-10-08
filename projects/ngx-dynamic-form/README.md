# NgxDynamicForm

## Create a custom Form Control

Other than the build-in form controls, it is possible to plug in you own custom controls. Start out with creating a custom form control component:

> https://blog.angular-university.io/angular-custom-form-controls/

After that follow the following steps.

### Create a model

First step is to create a model and interface for the custom control containing the control specific properties for the configuration definitions, extending the base interface/model from the library.
Also, you need to create an (unique) name for the type of the

For example if you're creating a control with a slider to select a value between 0 and 10:

#### Interface:

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
