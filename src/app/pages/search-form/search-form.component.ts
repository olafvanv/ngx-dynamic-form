import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig, DynamicFormService } from 'ngx-dynamic-form';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { AppService } from 'src/app/services/app.service';
import { ADDRESS_FORM, AddressFormModel } from './address';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements AfterViewInit, OnDestroy {
  public searchFormConfig: DynamicFormConfig = ADDRESS_FORM;
  public searchForm: FormGroup<AddressFormModel> = this.dynamicFormService.createFormGroup(this.searchFormConfig);

  private subs = new Subscription();
  constructor(
    private appService: AppService,
    private addressService: AddressService,
    private dynamicFormService: DynamicFormService
  ) {
    this.subs.add(this.appService.logClicked.subscribe(() => console.log(this.searchForm)));
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.searchForm
        ?.get('postcode')
        ?.valueChanges.pipe(
          distinctUntilChanged(),
          filter((val) => !!val && val.length === 6)
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
    this.addressService.getAddressByPostcode(postcode).subscribe((res) => {
      this.searchForm.patchValue({
        street: res?.straatnaam,
        city: res?.woonplaatsnaam
      });
    });
  }
}
