import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { DYNAMIC_FORM_FIELD_MAP } from 'ngx-dynamic-form';
import { routes } from './app.routes';
import { SliderInputComponent } from './shared/slider-input/slider-input.component';
import { DYNAMIC_FORM_FIELD_SLIDER } from './shared/slider-input/slider-input.model';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideHttpClient(),
    {
      provide: DYNAMIC_FORM_FIELD_MAP,
      useValue: {
        [DYNAMIC_FORM_FIELD_SLIDER]: SliderInputComponent
      }
    }
  ]
};
