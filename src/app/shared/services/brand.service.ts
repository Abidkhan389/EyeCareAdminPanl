import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BRAND_NAME, IBrand } from '../models/brand';
import { Title } from '@angular/platform-browser';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  /**
   * @private
   * @type {BehaviorSubject<IBrand>}
   * @description BehaviorSubject representing the current brand information.
   */
  private _brand: BehaviorSubject<IBrand> = new BehaviorSubject({
    brand: BRAND_NAME.BB,
    name: 'Bright Board',
    buildDate: '',
    version: '1.0.0',
  } as IBrand);

  /** Observable for brand information */
  brand$: Observable<IBrand> = this._brand.asObservable();

  /**
   * @constructor
   * @param {ApiService} apiService - The API service to communicate with the backend.
   * @param {Title} browserTitle - The browser title service to change the browser title.
   */
  constructor(private apiService: ApiService, private browserTitle: Title) {}

  /**
   * Retrieves brand information from the backend and sets the brand.
   * @returns {Observable<IBrand>} - Observable with brand information.
   */
  getBrand(): Observable<IBrand> {
    return this.apiService.getBrand<IBrand>().pipe(
      tap((brand) => {
        this.setBrand(brand);
      })
    );
  }

  /**
   * @private
   * @description Sets the brand details, updates the browser title, and notifies the observers.
   * @param {IBrand} brand - Brand information to be set.
   */
  private setBrand(brand: IBrand) {
    this.browserTitle.setTitle(brand.name);
    this._brand.next(brand);
  }
}
