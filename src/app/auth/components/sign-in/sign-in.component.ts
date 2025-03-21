import { AuthService } from './../../services/auth.service';
import { IBrand } from './../../../shared/models/brand';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize, first, Observable } from 'rxjs';
import { BrandService } from '../../../shared/services/brand.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  hidePassword = true;
  brand$!: Observable<IBrand>;

  constructor(
    private fb: NonNullableFormBuilder,
    private brandService: BrandService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.brand$ = this.brandService.brand$;

    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      //rememberMe: [true],
    });
  }

  onFormSubmit(e: Event): void {
    e.preventDefault();

    if (this.signInForm.invalid) {
      this.markFormControlsAsDirty();
      return;
    }

    this.loadingService.show();

    if (this.signInForm.valid) {
     // const { username, password } = this.signInForm.value;
      let model = Object.assign({}, this.signInForm.getRawValue());
      model.twoFactorCode=null,
      model.twoFactorRecoveryCode=null
      this.authService
        .login(model)
        .pipe(
          first(),
          finalize(() => {
            this.loadingService.hide();
          })
        )
        .subscribe({
          next: (response:any) => {
            if (response.token) {
              localStorage.setItem('authToken', response.token);
              localStorage.setItem('firstName', response.firstName ?? '');
              localStorage.setItem('lastName', response.lastName ?? '');
              localStorage.setItem('FullName', response.firstName ?? '' + response.lastName ?? '');
              localStorage.setItem('id', response.id ?? '');
              localStorage.setItem(
                'profilePicture',
                response.profilePicture ?? ''
              );
              localStorage.setItem('roles', response.roles.toString());
              localStorage.setItem('email', response.email ?? '');
              this.router.navigate(['/main']);
            } else {
              this.alertService.alert(
                'Invalid Username and/or Password',
                ALERT_TYPE.ERROR
              );
            }
          },
          error: (error) => {
            this.alertService.alert(error.message, ALERT_TYPE.ERROR);
          },
        });
    }
  }

  private markFormControlsAsDirty(): void {
    Object.values(this.signInForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
