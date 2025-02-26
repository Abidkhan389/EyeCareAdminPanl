import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ModalService } from '../services/modal.service';
import Swal from 'sweetalert2';
import { fromEvent } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
@Directive({
  selector: '[appAdminOnly]',
})
export class AdminOnlyDirective {
  element!: ElementRef;
  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {
    this.element = el;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const currentUser = this.authService.getCurrentUser();

    // Check if the current user has the 'ADMIN' or 'SUPERADMIN' role
    if (
      !currentUser ||
      !(
        currentUser.roles.includes('ADMIN') ||
        currentUser.roles.includes('SUPERADMIN')
      )
    ) {
      // Prevent the event from continuing
      event.preventDefault();
      event.stopPropagation(); // Stops event bubbling and default action

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          const shouldCancelNavigation = true;

          if (shouldCancelNavigation) {
            // Cancel the navigation by redirecting back
            this.router.navigate(['/']); // Redirect to another route or stay on the current page
          }
        }
      });

      Swal.fire(
        'Access Denied',
        'You do not have permissions to perform this task.',
        'error'
      );

      return false;
    }
    return true;
  }
}
