import {
  DynamicCheckbox,
  DynamicFormConfig,
  DynamicFormValidators,
  DynamicInput,
  DynamicSelect,
  DynamicTextarea,
  RelationActionType
} from 'ngx-dynamic-form';

export type MediaType = 'movie' | 'series' | 'book';

const MEDIA_TYPES = [
  {
    value: 'movie',
    label: 'Movie'
  },
  {
    value: 'series',
    label: 'Series'
  },
  {
    value: 'book',
    label: 'Book'
  }
];

export const MEDIA_FORM_CONFIG: DynamicFormConfig = [
  [
    new DynamicInput({
      name: 'id',
      hidden: true
    })
  ],
  [
    new DynamicSelect({
      name: 'type',
      label: 'Media type',
      options: MEDIA_TYPES,
      validators: [DynamicFormValidators.required()]
    })
  ],
  [
    new DynamicInput({
      name: 'title',
      label: 'Title',
      validators: [DynamicFormValidators.required()]
    })
  ],
  [
    new DynamicInput({
      name: 'imdbLink',
      label: 'IMDB page',
      validators: [DynamicFormValidators.pattern(new RegExp('https?://[^s/$.?#].[^s]*'), 'Geen geldige url ingevoerd')],
      relations: [
        {
          actionType: RelationActionType.VISIBLE,
          conditions: [
            {
              fieldName: 'type',
              value: (val: MediaType) => val === 'movie' || val === 'series'
            }
          ]
        }
      ]
    })
  ],
  [
    new DynamicInput({
      name: 'genre',
      label: 'Genre'
    })
  ],

  [
    new DynamicTextarea({
      name: 'description',
      label: 'Description'
    })
  ],
  [
    new DynamicCheckbox({
      name: 'consumed',
      label: 'I have consumed this media'
    })
  ]
];
