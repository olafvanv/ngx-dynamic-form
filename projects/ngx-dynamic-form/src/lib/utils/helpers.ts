import { map, Observable } from 'rxjs';
import { DynamicFormFieldOption } from '../models/classes/dynamic-form-field-option-model';

/**
 * Transform any list to a list of DynamicFormFieldOption which is used in any Dynamic Form Field with options (e.g. DynamicSelect).
 * Possible to provide the method with type definitions to define the provided list type `<T>` and desired option value type `<K>`:
 *
 * `dynamicFormService.toDynamicOptionList<T, K>(...)`
 *
 * Generic types:
 *  - T = The type of the items in the provided list
 *  - K = The type of the value inside an DynamicFormFieldOption. Default is 'string'
 * @param arr An array of items of type T
 * @param labelFn Callback to define the label of the options in the template
 * @param valueFn Callback to define the value of the options. Must return a value of type K (default string)
 * @returns
 */
export function arrToDynamicFormOptions<T, K = string>(
  arr: T[],
  labelFn: (item: T) => string,
  valueFn: (item: T) => K
): DynamicFormFieldOption<K>[] {
  return arr.map((item) => {
    return {
      label: labelFn(item),
      value: valueFn(item)
    };
  });
}

/**
 * Transform any Observable of a list to a list of DynamicFormFieldOption which is used in any Dynamic Form Field with options (e.g. DynamicSelect).
 * Possible to provide the method with type definitions to define the provided list type `<T>` and desired option value type `<K>`:
 *
 * `dynamicFormService.toDynamicOptionList<T, K>(...)`
 *
 * Generic types:
 *  - T = The type of the items in the provided list
 *  - K = The type of the value inside an DynamicFormFieldOption. Default is 'string'
 * @param obs An Observable of a list of items of type T
 * @param labelFn Callback to define the label of the options in the template
 * @param valueFn Callback to define the value of the options. Must return a value of type K (default string)
 * @returns
 */
export function obsToDynamicFormOptions<T, K = string>(
  obs: Observable<T[]>,
  labelFn: (item: T) => string,
  valueFn: (item: T) => K
): Observable<DynamicFormFieldOption<K>[]> {
  return obs.pipe(map((arr) => arrToDynamicFormOptions(arr, labelFn, valueFn)));
}
