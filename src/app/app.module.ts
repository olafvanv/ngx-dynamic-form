import { NgModule, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormFieldModel } from 'dist/ngx-dynamic-form/lib/models/dynamic-form-field.model';
import { DynamicFormField } from 'dist/ngx-dynamic-form/lib/models/interfaces/dynamic-form-field.interface';
import { DYNAMIC_FORM_FIELD_TYPE_MAP_FN, DynamicFormModule } from 'ngx-dynamic-form';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './pages/search-form/search-form.component';
import { SimpleFormComponent } from './pages/simple-form/simple-form.component';
import { SliderInputComponent } from './shared/slider-input/slider-input.component';
import { DYNAMIC_FORM_FIELD_TYPE_SLIDER } from './shared/slider-input/slider-input.model';

@NgModule({
  declarations: [AppComponent, SimpleFormComponent, SearchFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DynamicFormModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_FIELD_TYPE_MAP_FN,
      useValue: (model: DynamicFormFieldModel): Type<DynamicFormField> | null => {
        switch (model.type) {
          case DYNAMIC_FORM_FIELD_TYPE_SLIDER:
            return SliderInputComponent;
          default:
            return null;
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
