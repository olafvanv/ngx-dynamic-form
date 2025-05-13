import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig, DynamicFormService } from 'ngx-dynamic-form';
import { Subscription, delay, distinctUntilChanged, filter, tap } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { AppService } from 'src/app/services/app.service';
import { AddressForm, AddressFormModel } from './address';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    standalone: false
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public addressForm = new AddressForm();
  public searchFormConfig: DynamicFormConfig = this.addressForm.formConfig;
  public searchForm: FormGroup<AddressFormModel> = this.dynamicFormService.createFormGroup(this.searchFormConfig);

  private subs = new Subscription();
  constructor(
    private appService: AppService,
    private addressService: AddressService,
    private dynamicFormService: DynamicFormService
  ) {
    this.subs.add(this.appService.logClicked.subscribe(() => console.log(this.searchForm)));
  }

  ngOnInit(): void {
    this.subs.add(
      this.searchForm
        ?.get('postcode')
        ?.valueChanges.pipe(
          distinctUntilChanged(),
          filter((val) => !!val && val.length === 6),
          tap((val) => console.log(val))
        )
        .subscribe((val) => (val ? this.getAddress(val) : null))
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit() {
    console.log(this.searchForm.getRawValue());
  }

  private getAddress(postcode: string) {
    this.addressForm.$searchingAddress.set(true);
    this.addressService
      .getAddressByPostcode(postcode)
      .pipe(delay(3000))
      .subscribe((res) => {
        this.searchForm.patchValue({
          street: res?.straatnaam,
          city: res?.woonplaatsnaam
        });

        this.addressForm.$searchingAddress.set(false);
      });
  }
}
