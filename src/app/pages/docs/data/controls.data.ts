import {
  DynamicAutocomplete,
  DynamicButton,
  DynamicButtonToggles,
  DynamicCheckbox,
  DynamicDatepicker,
  DynamicInput,
  DynamicRadioGroup,
  DynamicReadonly,
  DynamicSelect,
  DynamicSlideToggle,
  DynamicStaticText,
  DynamicTextarea
} from 'ngx-dynamic-form';
import { LibraryDoc } from '../docs.models';

export const CONTROLS_DATA: LibraryDoc[] = [
  {
    id: 'autocomplete',
    name: 'Autocomplete',
    category: 'Controls',
    description: 'Advanced input component with real-time filtering support for both local and asynchronous data sources.',
    usage: `// Prefetched Mode (with label lookup)\nnew DynamicAutocomplete({\n  name: 'country',\n  label: 'Country',\n  options: [\n    { label: 'Netherlands', value: 'NL' },\n    { label: 'United States', value: 'US' }\n  ],\n  displayFn: (val) => val === 'NL' ? 'Netherlands' : 'United States'\n})\n\n// Async Search Mode\nnew DynamicAutocomplete({\n  name: 'user',\n  label: 'Search User',\n  searchFn: (term) => this.userService.search(term)\n})`,
    config: [
      new DynamicAutocomplete({
        name: 'demo-autocomplete',
        label: 'Select City (Local)',
        value: 'HAG',
        options: [
          { label: 'Amsterdam', value: 'AMS' },
          { label: 'Rotterdam', value: 'RTM' },
          { label: 'Utrecht', value: 'UTR' },
          { label: 'The Hague', value: 'HAG' }
        ]
      })
    ],
    properties: [
      {
        name: 'options',
        type: 'DynamicOptionList',
        required: false,
        default: '[]',
        description: 'List of pre-fetched options for local filtering.'
      },
      {
        name: 'searchFn',
        type: '(term) => Observable',
        required: false,
        default: 'null',
        description: 'Function to fetch options asynchronously based on search term.'
      },
      {
        name: 'filterFn',
        type: '(term, option) => boolean',
        required: false,
        default: 'Internal contains',
        description: 'Custom predicate for local filtering.'
      },
      {
        name: 'debounceTime',
        type: 'number',
        required: false,
        default: '300',
        description: 'Delay in ms between keystroke and search execution.'
      },
      {
        name: 'displayFn',
        type: '(value) => string',
        required: false,
        default: 'value',
        description: 'Function to format the selected value for display in the input.'
      },
      {
        name: 'placeholder',
        type: 'srting',
        required: false,
        default: '',
        description: 'Placeholder text'
      }
    ]
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Controls',
    description: 'Standard text input supporting various types like text, password, email, and more.',
    usage: `new DynamicInput({\n  name: 'username',\n  label: 'Username',\n  inputType: 'text',\n  validators: [DynamicFormValidators.required()]\n})`,
    config: [
      new DynamicInput({
        name: 'demo-input',
        label: 'Full Name',
        placeholder: 'John Doe',
        hint: 'Enter your first and last name'
      })
    ],
    properties: [
      { name: 'name', type: 'string', required: true, default: '-', description: 'FormControlName identifier.' },
      { name: 'label', type: 'string', required: false, default: 'null', description: 'Label shown above the input.' },
      {
        name: 'inputType',
        type: 'string',
        required: false,
        default: "'text'",
        description: 'HTML input type attribute.'
      },
      { name: 'placeholder', type: 'string', required: false, default: "''", description: 'Placeholder text.' }
    ],
    cssVariables: [{ name: '--mat-form-field-container-height', description: 'Container height override.', default: '56px' }]
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Controls',
    description: 'Selection component for single or multiple choices from a list.',
    usage: `new DynamicSelect({\n  name: 'country',\n  label: 'Country',\n  options: [\n    { label: 'USA', value: 'us' },\n    { label: 'UK', value: 'uk' }\n  ]\n})`,
    config: [
      new DynamicSelect({
        name: 'demo-select',
        label: 'Preferred Language',
        options: [
          { label: 'English', value: 'en' },
          { label: 'Dutch', value: 'nl' },
          { label: 'Spanish', value: 'es' }
        ]
      })
    ],
    properties: [
      { name: 'options', type: 'DynamicFormOption[]', required: false, default: '[]', description: 'Flat list of options.' },
      {
        name: 'groupedOptions',
        type: 'DynamicFormGroupedOption[]',
        required: false,
        default: '[]',
        description: 'Options grouped by label.'
      }
    ]
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Controls',
    description: 'Binary selection component for boolean values.',
    usage: `new DynamicCheckbox({\n  name: 'terms',\n  label: 'I accept the terms and conditions',\n  value: false\n})`,
    config: [
      new DynamicCheckbox({
        name: 'demo-checkbox',
        label: 'Subscribe to newsletter',
        value: true
      })
    ],
    properties: [{ name: 'label', type: 'string', required: true, default: '-', description: 'The text label for the checkbox.' }]
  },
  {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'Controls',
    description: 'Selection component for choosing exactly one option from a set.',
    usage: `new DynamicRadioGroup({\n  name: 'gender',\n  label: 'Gender',\n  options: [\n    { label: 'Male', value: 'm' },\n    { label: 'Female', value: 'f' }\n  ]\n})`,
    config: [
      new DynamicRadioGroup({
        name: 'demo-radio',
        label: 'Shipping Method',
        options: [
          { label: 'Standard', value: 'std' },
          { label: 'Express', value: 'exp' }
        ]
      })
    ],
    properties: [{ name: 'options', type: 'DynamicFormOption[]', required: true, default: '-', description: 'List of radio options.' }]
  },
  {
    id: 'slide-toggle',
    name: 'Slide Toggle',
    category: 'Controls',
    description: 'Material Design toggle switch for boolean preferences.',
    usage: `new DynamicSlideToggle({\n  name: 'dark-mode',\n  label: 'Dark Theme',\n  value: true\n})`,
    config: [
      new DynamicSlideToggle({
        name: 'demo-toggle',
        label: 'Enable high security mode',
        value: false
      })
    ],
    properties: [{ name: 'label', type: 'string', required: true, default: '-', description: 'Toggle label text.' }]
  },
  {
    id: 'datepicker',
    name: 'Datepicker',
    category: 'Controls',
    description: 'Date selection component using the Material Datepicker.',
    usage: `new DynamicDatepicker({\n  name: 'birthdate',\n  label: 'Date of Birth'\n})`,
    config: [
      new DynamicDatepicker({
        name: 'demo-date',
        label: 'Appointment Date'
      })
    ],
    properties: [{ name: 'label', type: 'string', required: true, default: '-', description: 'Label for the date input.' }]
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Controls',
    description: 'Multi-line text input field.',
    usage: `new DynamicTextarea({\n  name: 'bio',\n  label: 'Biography',\n  rows: 4\n})`,
    config: [
      new DynamicTextarea({
        name: 'demo-textarea',
        label: 'Comments',
        placeholder: 'Type your feedback here...'
      })
    ],
    properties: [{ name: 'rows', type: 'number', required: false, default: '3', description: 'Number of visible text lines.' }]
  },
  {
    id: 'button-toggles',
    name: 'Button Toggles',
    category: 'Controls',
    description: 'Group of mutually exclusive buttons for selection.',
    usage: `new DynamicButtonToggles({\n  name: 'align',\n  options: [\n    { label: 'Left', value: 'l' },\n    { label: 'Center', value: 'c' },\n    { label: 'Right', value: 'r' }\n  ]\n})`,
    config: [
      new DynamicButtonToggles({
        name: 'demo-toggles',
        options: [
          { label: 'Phone', value: 'p' },
          { label: 'Email', value: 'e' },
          { label: 'Post', value: 'o' }
        ]
      })
    ],
    properties: [{ name: 'options', type: 'DynamicFormOption[]', required: true, default: '-', description: 'Toggle button options.' }]
  },
  {
    id: 'button',
    name: 'Button',
    category: 'Controls',
    description: 'Standard button component supporting various variants and colors.',
    usage: `new DynamicButton({\n  name: 'submit',\n  label: 'Save Changes',\n  variant: 'filled',\n  color: 'primary'\n})`,
    config: [
      new DynamicButton({
        name: 'demo-button',
        label: 'Interactive Button',
        variant: 'filled',
        clicked: () => null
      })
    ],
    properties: [
      {
        name: 'variant',
        type: "'filled'|'outlined'|'text'",
        required: false,
        default: "'filled'",
        description: 'Visual appearance of the button.'
      },
      { name: 'color', type: 'string', required: false, default: "'primary'", description: 'Material theme color.' }
    ]
  },
  {
    id: 'static-text',
    name: 'Static Text',
    category: 'Controls',
    description: 'Informational component for headings and descriptions.',
    usage: `new DynamicStaticText({\n  name: 'info',\n  value: { title: 'Heading', text: 'Description' }\n})`,
    config: [
      new DynamicStaticText({
        name: 'demo-static',
        value: { title: 'Documentation Section', text: 'This text is purely informational.' }
      })
    ],
    properties: [
      { name: 'value.title', type: 'string', required: false, default: '-', description: 'Heading text.' },
      { name: 'value.text', type: 'string', required: false, default: '-', description: 'Paragraph text.' }
    ]
  },
  {
    id: 'readonly',
    name: 'Readonly',
    category: 'Controls',
    description: 'A non-interactive display field for presenting values within the form layout.',
    usage: `new DynamicReadonly({\n  name: 'userId',\n  label: 'User ID',\n  value: 'USR-12345'\n})`,
    config: [
      new DynamicReadonly({
        name: 'demo-readonly',
        label: 'Account Status',
        value: 'Active'
      })
    ],
    properties: [
      { name: 'value', type: 'string | number', required: false, default: 'null', description: 'The value to be displayed.' },
      { name: 'label', type: 'string', required: false, default: '-', description: 'Label for the readonly field.' }
    ]
  }
];
