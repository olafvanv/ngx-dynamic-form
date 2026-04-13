import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicInput } from '../controls/input/dynamic-input.model';
import { DynamicFormFieldModel } from '../models';
import { DynamicFormFieldBase } from '../models/classes/dynamic-form-field-base';
import { DYNAMIC_FORM_FIELD_MAP } from '../models/tokens/dynamic-form-field-map.token';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  template: '',
  standalone: true
})
class MockControlComponent extends DynamicFormFieldBase<any> {
  group = input.required<FormGroup>();
  model = input.required<any>();
}

describe('DynamicFormService', () => {
  let service: DynamicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicFormService,
        {
          provide: DYNAMIC_FORM_FIELD_MAP,
          useValue: {
            mock: MockControlComponent
          }
        }
      ]
    });

    service = TestBed.inject(DynamicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createFormGroup', () => {
    it('should create a typed FormGroup with the correct number of controls', () => {
      interface TestModel {
        field1: string;
        field2: string;
        field3: string;
      }

      const config = [
        new DynamicInput({ name: 'field1', label: 'Field 1' }),
        new DynamicInput({ name: 'field2', label: 'Field 2' }),
        new DynamicInput({ name: 'field3', label: 'Field 3' })
      ];

      const group = service.createFormGroup<TestModel>(config);

      expect(Object.keys(group.controls).length).toBe(3);
      expect(group.get('field1')).toBeTruthy();
      expect(group.get('field2')).toBeTruthy();
      expect(group.get('field3')).toBeTruthy();
    });

    it('should initialize controls with provided values', () => {
      const config = [
        new DynamicInput({ name: 'prefilled', label: 'Prefilled', value: 'Hello' }),
        new DynamicInput({ name: 'empty', label: 'Empty' })
      ];

      const group = service.createFormGroup(config);

      expect(group.get('prefilled')?.value).toBe('Hello');
      expect(group.get('empty')?.value).toBe(null);
    });

    it('should set controls to disabled if config specifies it', () => {
      const config = [new DynamicInput({ name: 'disabledField', label: 'Disabled', disabled: true })];

      const group = service.createFormGroup(config);

      expect(group.get('disabledField')?.disabled).toBeTrue();
    });

    it('should apply validators from the configuration', () => {
      const config = [
        new DynamicInput({
          name: 'requiredField',
          label: 'Required',
          validators: [{ name: 'required', validator: Validators.required, message: 'Required' }]
        })
      ];

      const group = service.createFormGroup(config);
      const control = group.get('requiredField');

      expect(control?.validator).toBeTruthy();
      control?.setValue('');
      expect(control?.hasError('required')).toBeTruthy();
    });
  });

  describe('getCustomControlComponentType', () => {
    it('should return the correct component type from the field map', () => {
      const model = { type: 'mock' } as DynamicFormFieldModel;
      const componentType = service.getCustomControlComponentType(model);

      expect(componentType).toBe(MockControlComponent);
    });

    it('should return null if no mapping exists for the type', () => {
      const model = { type: 'unknown' } as DynamicFormFieldModel;
      const componentType = service.getCustomControlComponentType(model);

      expect(componentType).toBeNull();
    });
  });
});
