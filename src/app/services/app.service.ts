import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  public logClicked = new EventEmitter<void>();
  constructor() {}

  emitLogClick() {
    this.logClicked.emit();
  }
}
