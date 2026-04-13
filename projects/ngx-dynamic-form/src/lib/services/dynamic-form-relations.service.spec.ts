import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicInput } from '../controls/controls';
import { RelationActionType } from '../models';
import { DynamicFormRelationsService } from './dynamic-form-relations.service';

describe('DynamicFormRelationsService', () => {
  let service: DynamicFormRelationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicFormRelationsService]
    });

    service = TestBed.inject(DynamicFormRelationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findRelatedFormField', () => {
    it('should find the related form field', () => {
      const model1 = new DynamicInput({
        name: 'test1',
        relations: [
          { actionType: RelationActionType.DISABLED, conditions: [{ fieldName: 'test2', value: (value) => value === 'hide-test2' }] }
        ]
      });

      const group = new FormGroup({
        test1: new FormControl(''),
        test2: new FormControl('')
      });

      const relatedFormControls = service.findRelatedFormField(model1, group);

      expect(Object.keys(relatedFormControls)).toContain('test2');
      expect(relatedFormControls['test2']).toBe(group.get('test2') as FormControl);
    });
  });

  it('should find multiple related form fields', () => {
    const model1 = new DynamicInput({
      name: 'test1',
      relations: [
        {
          actionType: RelationActionType.DISABLED,
          conditions: [{ fieldName: 'test2', value: (value) => value === true }]
        },
        {
          actionType: RelationActionType.HIDDEN,
          conditions: [{ fieldName: 'test3', value: (value) => value === false }]
        }
      ]
    });

    const group = new FormGroup({
      test1: new FormControl(''),
      test2: new FormControl(false),
      test3: new FormControl(false)
    });

    const relatedFormControls = service.findRelatedFormField(model1, group);

    expect(Object.keys(relatedFormControls)).toContain('test2');
    expect(Object.keys(relatedFormControls)).toContain('test3');
    expect(relatedFormControls['test2']).toBe(group.get('test2') as FormControl);
    expect(relatedFormControls['test3']).toBe(group.get('test3') as FormControl);
  });

  it('should return an empty object when no relations are found', () => {
    spyOn(console, 'warn');

    const model1 = new DynamicInput({
      name: 'test1',
      relations: [
        {
          actionType: RelationActionType.DISABLED,
          conditions: [{ fieldName: 'test2', value: (value) => value }]
        }
      ]
    });

    const group = new FormGroup({
      test1: new FormControl('')
    });

    const relatedFormControls = service.findRelatedFormField(model1, group);

    expect(Object.keys(relatedFormControls).length).toBe(0);
    expect(console.warn).toHaveBeenCalledWith('No related form control with the name test2 found');
  });
});
