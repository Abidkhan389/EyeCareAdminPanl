import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BRAND_NAME, IBrand } from '../../../shared/models/brand';
import { THEME_NAME } from '../../../shared/models/theme';
import { BrandService } from '../../../shared/services/brand.service';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * @private
   * @type {Subscription}
   * @description Subscription to the auth service logout, used to log user out.
   */
  private sub!: Subscription;

  /** @property {EventEmitter<boolean>} navToggle - Event to toggle navigation. */
  @Output() navToggle = new EventEmitter<boolean>();

  /** @property {Observable<string>} title$ - An observable of the page title. */
  brand$!: Observable<IBrand>;

  /** @property {THEME_NAME} themeNames - Enumeration of theme names. */
  themeNames = THEME_NAME;

  /** @property {BRAND_NAME} brandNames - Enumeration of brand names. */
  brandNames = BRAND_NAME;

  /**
   * @constructor
   * @param {--page-titleService} --page-titleService - Service to get the page title.
   * @param {AuthService} authService - Service for authentication.
   * @param {ThemeService} themeService - Service to handle theme selection.
   */
  constructor(
    private brandService: BrandService,
    private themeService: ThemeService
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that initializes the component.
   */
  ngOnInit(): void {
    this.brand$ = this.brandService.brand$;
  }

  /**
   * @method navOpen
   * @description Emits an event to open the navigation.
   */
  navOpen(): void {
    this.navToggle.emit(true);
  }

  /**
   * @method setTheme
   * @param {THEME_NAME} theme - The theme to be set.
   * @description Sets the selected theme.
   */
  setTheme(theme: THEME_NAME) {
    this.themeService.setTheme(theme);
  }

  /**
   * @method logout
   * @description Triggers the logout action.
   */
  logout(): void {}

  /**
   * Cleans up the component by unsubscribing from the auth service logout subscription.
   */
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
