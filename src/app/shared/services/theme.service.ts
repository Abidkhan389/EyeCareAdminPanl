import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THEME_NAME } from '../models/theme';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * Internal BehaviorSubject that holds the current theme value.
   */
  private _theme = new BehaviorSubject(THEME_NAME.LIGHT);

  /**
   * Observable representing the current theme.
   */
  readonly theme$: Observable<THEME_NAME> = this._theme.asObservable();

  /**
   * Constructs an instance of the ThemeService, with the Angular Document service injected.
   *
   * @param {Document} document - The Angular Document service used to access the DOM.
   */
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Sets the application theme, updates the internal theme subject, and applies the selected theme to the DOM.
   *
   * @param {THEME_NAME} value - The theme name enum value.
   */
  setTheme(value: THEME_NAME) {
    this._theme.next(value);
    this._applyTheme(value);
  }

  private _applyTheme(value: THEME_NAME) {
    const { classList } = this.document.documentElement;
    if (classList.length > 0) classList.remove(classList[0]);
    classList.add(value.toLowerCase());
  }
}
