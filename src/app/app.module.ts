import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DYNAMIC_FORM_FIELD_MAP, DynamicFormComponent } from 'ngx-dynamic-form';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './pages/search-form/search-form.component';
import { SimpleFormComponent } from './pages/simple-form/simple-form.component';
import { SliderInputComponent } from './shared/slider-input/slider-input.component';
import { DYNAMIC_FORM_FIELD_SLIDER } from './shared/slider-input/slider-input.model';

@NgModule({
  declarations: [AppComponent, SimpleFormComponent, SearchFormComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, MatToolbarModule, MatButtonModule, MatCardModule, DynamicFormComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {
      provide: DYNAMIC_FORM_FIELD_MAP,
      useValue: {
        [DYNAMIC_FORM_FIELD_SLIDER]: SliderInputComponent
      }
    },
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
