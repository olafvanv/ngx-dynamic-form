import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { DynamicFormComponent, DynamicFormService } from 'ngx-dynamic-form';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { FormGroupModel } from 'src/app/shared/utils/form-group-model.type';
import { BOOKING_ADDRESS_CONFIG } from './form-configs/address';
import { BOOKING_PERSON_CONFIG } from './form-configs/person';

interface BookingFormModel {
  person: FormGroupModel<BookingPerson>;
  address: FormGroupModel<BookingAddress>;
}

interface BookingPerson {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isDutch: boolean;
}

interface BookingAddress {
  street: string;
  postcode: string;
  country: string;
}

@Component({
    imports: [ReactiveFormsModule, DynamicFormComponent, MatExpansionModule],
    selector: 'app-multi-sections-demo',
    templateUrl: './multi-sections-demo.component.html'
})
export class MultiSectionsDemoComponent {
  public readonly personFormConfig = BOOKING_PERSON_CONFIG;
  public readonly addressFormConfig = BOOKING_ADDRESS_CONFIG;

  public bookingForm!: FormGroup<BookingFormModel>;
  public personForm!: FormGroupModel<BookingPerson>;
  public addressForm!: FormGroupModel<BookingAddress>;

  private subs = new Subscription();

  constructor(
    private dynamicFormService: DynamicFormService,
    private fb: FormBuilder,
    private appService: AppService
  ) {
    this.personForm = this.dynamicFormService.createFormGroup(this.personFormConfig);
    this.addressForm = this.dynamicFormService.createFormGroup(this.addressFormConfig);

    this.bookingForm = this.fb.group({
      person: this.personForm,
      address: this.addressForm
    });

    this.subs.add(
      this.appService.logClicked.subscribe(() => {
        console.log('form group', this.bookingForm);
        console.log('booking form value', this.bookingForm.value);
      })
    );
  }
}
