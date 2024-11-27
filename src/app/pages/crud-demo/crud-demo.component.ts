import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DynamicFormComponent, DynamicFormService } from 'ngx-dynamic-form';
import { CrudDemoService, Media } from './crud-demo.service';
import { MEDIA_FORM_CONFIG } from './media-form';

@Component({
  selector: 'app-crud-demo',
  standalone: true,
  imports: [DynamicFormComponent, MatListModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './crud-demo.component.html',
  styleUrls: ['./crud-demo.component.scss']
})
export class CrudDemoComponent {
  private readonly _service = inject(CrudDemoService);
  private readonly _dynamicFormService = inject(DynamicFormService);

  public $media = this._service.$media;
  public mediaFormConfig = MEDIA_FORM_CONFIG;
  public mediaFormGroup = this._dynamicFormService.createFormGroup(this.mediaFormConfig);
  public selectedItem: Media | null = null;

  public trackByFn(_: number, item: Media) {
    return item.id;
  }

  public createNew() {
    this.selectedItem = null;
    this.mediaFormGroup.reset();
  }

  public selectItem(item: Media) {
    console.log('selected item', item);

    this.selectedItem = item;
    this.mediaFormGroup.patchValue(item);
  }

  public saveItem() {
    const media: Media = this.mediaFormGroup.value;

    if (media.id) {
      this._service.updateMedia(media);
    } else {
      this._service.addMedia(media);
    }

    this.mediaFormGroup.reset();
  }

  public deleteItem() {}
}
