import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  constructor(private appService: AppService) {}

  onLogForm() {
    this.appService.emitLogClick();
  }
}
