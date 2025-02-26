import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  /** An observable to track navigation source changes. */
  source$!: Observable<null>;
  firstName!: string;
  lastName!: string;
  roles: string[] = [];
  profilePicture!: string;
  isDropdownOpen = false;
  /** An observable to determine whether the screen size is within the "Handset" breakpoint. */
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  /**
   * Creates an instance of the NavigationComponent.
   * @param {BreakpointObserver} breakpointObserver - Service for responding to changes in viewport size.
   * @param {NavigationService} navigationService - Service to handle the navigation logic.
   */
  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private navigationService: NavigationService
  ) {}

  /**
   * OnInit lifecycle hook to initialize the navigation source observable.
   */
  ngOnInit(): void {
    this.source$ = this.navigationService.navSource$;
    this.firstName = localStorage.getItem('firstName') ?? '';
    this.lastName = localStorage.getItem('lastName') ?? '';
    this.profilePicture = localStorage.getItem('profilePicture') ?? '';
    this.roles = localStorage.getItem('roles')?.split(',') ?? [];
  }

  expandMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateTo(route: string) {
    console.log('Navigating to:', route);
    this.isDropdownOpen = false;
  }

 

  /**
   * @method logout
   * @description Triggers the logout action.
   */
  logout(): void {
    this.isDropdownOpen = false;
    localStorage.removeItem('authToken');
    this.router.navigate(['']);
  }
}
