import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig } from 'ngx-dynamic-form';
import { Subscription, distinctUntilChanged, filter } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { AppService } from 'src/app/services/app.service';
import { ADDRESS_FORM, AddressFormModel } from './address';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnDestroy {
  public searchFormConfig: DynamicFormConfig = ADDRESS_FORM;
  public searchForm!: FormGroup<AddressFormModel>;

  private subs = new Subscription();
  constructor(
    private appService: AppService,
    private addressService: AddressService
  ) {
    this.subs.add(this.appService.logClicked.subscribe(() => console.log(this.searchForm)));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onFormReady(form: FormGroup<AddressFormModel>) {
    this.searchForm = form;

    this.subs.add(
      form
        .get('postcode')
        ?.valueChanges.pipe(
          distinctUntilChanged(),
          filter((val) => !!val && val.length === 6)
        )
        .subscribe((val: string | null) => {
          if (val) {
            this.addressService.getAddressByPostcode(val).subscribe((res) => {
              this.searchForm.patchValue({
                street: res?.straatnaam,
                city: res?.woonplaatsnaam
              });
            });
          }
        })
    );
  }
}
