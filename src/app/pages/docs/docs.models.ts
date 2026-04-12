import { DynamicFormConfig } from 'ngx-dynamic-form';

export type ApiProperty = {
  name: string;
  type: string;
  required: boolean;
  default: string;
  description: string;
};

export type LibraryDoc = {
  id: string;
  name: string;
  category: 'Controls' | 'API' | 'Utilities';
  description: string;
  config?: DynamicFormConfig;
  properties?: ApiProperty[];
  cssVariables?: { name: string; description: string; default?: string }[];
  usage: string;
};
