import { LibraryDoc } from '../docs.models';

export const UTILITIES_DATA: LibraryDoc[] = [
  {
    id: 'helpers',
    name: 'Data Helpers',
    category: 'Utilities',
    description:
      'Utility functions to quickly transform your data models or API responses into the standard option format required by the library.',
    usage: `// Array transformation\nconst options = arrToDynamicFormOptions(\n  users,\n  u => u.username,\n  u => u.id\n);\n\n// Observable transformation\nconst regions$ = obsToDynamicFormOptions(\n  this.api.getRegions(),\n  r => r.name,\n  r => r.code\n);`,
    properties: [
      {
        name: 'arrToDynamicFormOptions<T, K>',
        type: '(arr: T[], labelFn, valueFn) => DynamicFormOption<K>[]',
        required: false,
        default: '-',
        description: 'Maps an array of type T to options with values of type K (defaults to string).'
      },
      {
        name: 'obsToDynamicFormOptions<T, K>',
        type: '(obs: Observable<T[]>, labelFn, valueFn) => Observable<DynamicFormOption<K>[]>',
        required: false,
        default: '-',
        description: 'Pipes an Observable of type T[] into arrToDynamicFormOptions.'
      }
    ]
  }
];
