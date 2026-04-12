import { LibraryDoc } from '../docs.models';

export const API_DATA: LibraryDoc[] = [
  {
    id: 'validators',
    name: 'Validators',
    category: 'API',
    description:
      'Built-in validators optimized for dynamic forms. These return a DynamicFormValidator object containing the name, validator function, and error message.',
    usage: `DynamicFormValidators.required('Field is required')\nDynamicFormValidators.email('Invalid email')\nDynamicFormValidators.minLength(10, 'At least 10 characters')\nDynamicFormValidators.pattern(/^[0-9]*$/, 'Numbers only')`,
    properties: [
      { name: 'required(msg?)', type: 'Validator', required: false, default: '-', description: 'Field must have a value.' },
      {
        name: 'requiredTrue(msg?)',
        type: 'Validator',
        required: false,
        default: '-',
        description: 'Value must be true (usually for checkboxes).'
      },
      { name: 'email(msg?)', type: 'Validator', required: false, default: '-', description: 'Value must be a valid email format.' },
      {
        name: 'min(val, msg?)',
        type: 'Validator',
        required: false,
        default: '-',
        description: 'Value must be greater than or equal to val.'
      },
      { name: 'max(val, msg?)', type: 'Validator', required: false, default: '-', description: 'Value must be less than or equal to val.' },
      {
        name: 'minLength(min, msg?)',
        type: 'Validator',
        required: false,
        default: '-',
        description: 'Value must have at least min characters.'
      },
      {
        name: 'maxLength(max, msg?)',
        type: 'Validator',
        required: false,
        default: '-',
        description: 'Value must have at most max characters.'
      },
      {
        name: 'pattern(regex, msg?)',
        type: 'Validator',
        required: false,
        default: '-',
        description: 'Value must match the provided regex pattern.'
      }
    ]
  },
  {
    id: 'service',
    name: 'DynamicFormService',
    category: 'API',
    description: 'The core service used to generate Angular FormGroup instances from DynamicFormConfig arrays.',
    usage: `constructor(private dynamicFormService: DynamicFormService) {}\n\nthis.form = this.dynamicFormService.createFormGroup(this.config);`,
    properties: [
      {
        name: 'createFormGroup(config)',
        type: '(config: DynamicFormConfig) => FormGroup',
        required: true,
        default: '-',
        description: 'Transforms a configuration array into a reactive FormGroup with all controls and validators attached.'
      }
    ]
  }
];
