import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent, DynamicFormConfig } from 'ngx-dynamic-form';
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
  @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;

  public searchFormConfig: DynamicFormConfig = ADDRESS_FORM;
  public searchForm!: FormGroup<AddressFormModel>;

  private subs = new Subscription();
  constructor(
    private appService: AppService,
    private addressService: AddressService
  ) {
    this.subs.add(this.appService.logClicked.subscribe(() => console.log(this.searchForm)));
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.dynamicForm
        .onChange('postcode')
        .pipe(
          distinctUntilChanged(),
          filter((val) => !!val && val.length === 6)
        )
        .subscribe((val) => (val ? this.getAddress(val) : null))
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onFormReady(form: FormGroup<AddressFormModel>) {
    this.searchForm = form;
    // Method 1: using the available FormGroup provided by the 'ready' event of the DynamicFormComponent
    // this.subs.add(
    //   form
    //     .get('postcode')
    //     ?.valueChanges.pipe(
    //       distinctUntilChanged(),
    //       filter((val) => !!val && val.length === 6)
    //     )
    //     .subscribe((val: string | null) => (val ? this.getAddress(val) : null))
    // );

    //Method 2: using the build in onChange method of the DynamicFormComponent
    // this.subs.add(
    //   this.dynamicForm
    //     .onChange('postcode')
    //     .pipe(
    //       distinctUntilChanged(),
    //       filter((val) => !!val && val.length === 6)
    //     )
    //     .subscribe((val) => (val ? this.getAddress(val) : null))
    // );
  }

  onSubmit() {
    console.log(this.dynamicForm.getFormValue<AddressFormModel>());
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
