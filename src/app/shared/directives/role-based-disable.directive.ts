import {
  Directive,
  Input,
  OnInit,
  Optional,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appRoleBasedDisable]'
})
export class RoleBasedDisableDirective implements OnInit {
  @Input('appRoleBasedDisable') allowedRoles: string[] = []; // e.g. ['admin', 'super admin']
  @Input() currentUserRoles: string[] = []; // roles of current user
  @Input() loggedInDoctorId: any | null = null; // optional input for doctor id

  constructor(@Optional() @Self() private ngControl: NgControl) {}

  ngOnInit(): void {
    if (!this.ngControl?.control) return;

    const isAllowed = this.allowedRoles.some(role =>
      this.currentUserRoles.includes(role)
    );

    if (!isAllowed) {
      // Not admin or super admin → doctor logged in
      if (this.loggedInDoctorId) {
        this.ngControl.control.setValue(this.loggedInDoctorId); // pre-select doctor
      }
      this.ngControl.control.disable(); // disable dropdown
    } else {
      this.ngControl.control.enable(); // allow selection for admins
    }
  }
}
