import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormConfig, DynamicFormService } from 'ngx-dynamic-form';
import { Subscription } from 'rxjs';
import { PersonFormModel, Persoon } from 'src/app/pages/simple-form/persoon';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  standalone: false,
  styleUrl: './simple-form.component.scss'
})
export class SimpleFormComponent implements OnDestroy {
  public personFormConfig: DynamicFormConfig = new Persoon().formConfig;
  public personForm: FormGroup<PersonFormModel> = this.dynamicFormService.createFormGroup(this.personFormConfig);
  public personLayout: string[] = [
    'firstname name',
    'password',
    'time age age-2',
    'email button',
    'telefoon',
    'gender gender-advanced button-toggle',
    'parentName',
    'readonlyfield',
    'verhaal',
    'subscribe',
    'agree'
  ];

  private subs = new Subscription();

  constructor(
    private appService: AppService,
    private dynamicFormService: DynamicFormService
  ) {
    this.subs.add(
      this.appService.logClicked.subscribe(() => {
        console.log(this.personForm);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit() {
    console.log(this.personForm.value);
  }

  resetForm() {
    this.personForm.reset();
  }
}
