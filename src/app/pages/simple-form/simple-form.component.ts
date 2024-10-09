import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig } from 'ngx-dynamic-form';
import { Subscription } from 'rxjs';
import { PersonFormModel, PERSOON_FORM } from 'src/app/pages/simple-form/persoon';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnDestroy {
  public personFormConfig: DynamicFormConfig = PERSOON_FORM;
  public personForm!: FormGroup<PersonFormModel>;

  private subs = new Subscription();

  constructor(private appService: AppService) {
    this.subs.add(
      this.appService.logClicked.subscribe(() => {
        console.log(this.personForm);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onPersonReady(form: FormGroup<PersonFormModel>) {
    this.personForm = form;
    console.log(form);
  }

  submit() {}
}
