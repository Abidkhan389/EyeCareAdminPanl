import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { BrandService } from '../shared/services/brand.service';
import { NavigationService } from './services/navigation.service';
import { INavigationItem } from './models/navigation-item';
import { APP_NAVIGATION } from './models/navigation';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  /** Reference to the sidenav element */
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  /** Subscription object for managing observables */
  sub!: Subscription;

  /**
   * Observable to determine if the screen size matches handset breakpoints
   */
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  /**
   * @constructor
   * @param {BreakpointObserver} breakpointObserver - Provides media query matching capabilities
   * @param {NavigationService} navigationService - Service for managing navigation
   * @param {BrandService} brandService - Service for handling brands
   */
  constructor(
    private breakpointObserver: BreakpointObserver,
    private navigationService: NavigationService,
    private brandService: BrandService
  ) {}

  /**
   * OnInit lifecycle hook.
   * Initializes the component and sets up the navigation items.
   */
  ngOnInit(): void {
    this.sub = this.setNavigation().subscribe();
  }

  /**
   * Sets up the navigation items.
   *
   * @returns {Observable<INavigationItem[]>} Observable of filtered navigation items
   */
  setNavigation(): Observable<INavigationItem[]> {
    this.navigationService.setNavigation(APP_NAVIGATION);
    return of(APP_NAVIGATION);
  }

  /**
   * Toggles the navigation sidebar.
   */
  navToggle(): void {
    this.sidenav
      ? this.sidenav.opened
        ? this.sidenav.close()
        : this.sidenav.open()
      : null;
  }

  /**
   * OnDestroy lifecycle hook.
   * Unsubscribes from observables to clean up resources.
   */
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
