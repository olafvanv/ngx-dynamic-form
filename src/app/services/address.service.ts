import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  getAddressByPostcode(postcode: string): Observable<Address | null> {
    const url = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${postcode}`;

    return this.httpClient.get<PdokResponse>(url).pipe(map((data) => data.response.docs[0] ?? null));
  }
}
export interface PdokResponse {
  response: {
    numFound: number;
    start: number;
    maxScore: number;
    docs: Address[];
  };
}
export interface Address {
  woonplaatsnaam: string;
  straatnaam: string;
  provincienaam: string;
}
