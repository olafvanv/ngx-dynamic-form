import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Gender {
  value: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public getGenders(): Observable<Gender[]> {
    return of([
      {
        name: 'Man',
        value: 'M'
      },
      {
        name: 'Vrouw',
        value: 'V'
      }
    ]);
  }
}
