import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig } from 'ngx-dynamic-form';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { ADDRESS_FORM, AddressFormModel } from './forms/address';
import { PERSOON_FORM, PersonFormModel } from './forms/persoon';
import { AddressService } from './services/address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public personFormConfig: DynamicFormConfig = PERSOON_FORM;
  public addressFormConfig: DynamicFormConfig = ADDRESS_FORM;

  public personForm!: FormGroup<PersonFormModel>;
  public addressForm!: FormGroup<AddressFormModel>;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {}

  onPersonReady(form: FormGroup<PersonFormModel>) {
    this.personForm = form;
    console.log(form);
  }
  onAddressReady(form: FormGroup<AddressFormModel>) {
    this.addressForm = form;

    this.addressForm
      .get('postcode')
      ?.valueChanges.pipe(
        debounceTime(250),
        distinctUntilChanged(),
        filter((val) => val?.length === 6)
      )
      .subscribe((val) => {
        if (val) {
          this.searchAddress(val);
        }
      });
  }

  public logForm() {
    console.log(this.personForm);
  }

  private searchAddress(postcode: string) {
    this.addressService.getAddressByPostcode(postcode).subscribe((res) => {
      if (res) {
        this.addressForm.patchValue({
          street: res.straatnaam,
          city: res.woonplaatsnaam
        });
      } else {
        alert(`niks gevonden op postcode ${postcode}`);
      }
    });
  }
}
