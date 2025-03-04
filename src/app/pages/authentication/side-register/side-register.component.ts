import { Component,signal } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AuthService } from 'src/app/auth/services/auth.service';
import { passwordValidator } from 'src/app/shared/customValidators/passwordValidator';
import { confirmPasswordValidator } from 'src/app/shared/customValidators/confirmPasswordValidator';
import { confirmEmailOrPhoneNumber } from 'src/app/shared/customValidators/confirmEmailOrPhone';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ALERT_TYPE } from 'src/app/shared/models/alert';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  hide = signal(true);
  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  form = new FormGroup({
    uname: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      confirmEmailOrPhoneNumber(),
    ]),
    cpassword: new FormControl('', [
      Validators.required,
      confirmPasswordValidator('password'),
    ]),
    password: new FormControl('', [
      Validators.required,
      passwordValidator(),
      Validators.minLength(8),
    ]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    if (this.form.valid) {
      //const { uname, cpassword, password } = this.form.value;
      let model = { ...this.form.getRawValue() } as any;

      this.authService
        .registerUser(model)
        .subscribe((x) => {
          console.log(x);
          if (x.success) {
            this.router.navigate(['authentication/registersuccess']);
          } else {
            this.alertService.alert(
              'Fialed to register. Please contact admin if issue persists!',
              ALERT_TYPE.ERROR
            );
          }
        });
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
