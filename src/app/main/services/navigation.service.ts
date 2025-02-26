import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  /** @private The internal subject to hold the navigation source value. */
  private _navSource = new BehaviorSubject<null>(null);

  /**
   * An observable representing the current navigation source.
   * Subscribers can listen for changes to the navigation source value.
   */
  navSource$: Observable<null> = this._navSource.asObservable();

  constructor() {}

  /**
   * Sets a new navigation value and broadcasts it to all subscribers.
   *
   * @param {any} value - The value to be set for the navigation source.
   */
  setNavigation(value: any) {
    this._navSource.next(value);
  }
}
