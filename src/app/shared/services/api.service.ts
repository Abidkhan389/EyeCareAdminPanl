import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BRAND_NAME } from '../models/brand';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  getBrand<T>(): Observable<T> {
    return of({
      brand: BRAND_NAME.BB,
      name: 'Bright Board',
      buildDate: Date.now().toString(),
      version: '1.0.0',
    } as T);
  }
}
