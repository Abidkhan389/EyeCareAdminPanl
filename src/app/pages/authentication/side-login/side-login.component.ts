import { Component, signal } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { finalize, first } from 'rxjs';
import { ALERT_TYPE } from 'src/app/shared/models/alert';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenHelper } from 'src/app/_common/tokenHelper';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
hide = signal(true);
  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit(e: Event) {
    // console.log(this.form.value);
    e.preventDefault();

    if (this.form.invalid) {
      return;
    }

    this.loadingService.show();

    if (this.form.valid) {
      //const { uname, password } = this.form.value;
      let model = { ...this.form.getRawValue() } as any;
      model.twoFactorCode = null;
      model.twoFactorRecoveryCode = null;
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
            debugger
            if (response.data) {
                TokenHelper.setToken(response.data.token);
              AuthService.SaveUserInfo(response.data);
              AuthService.RedirectUserHome(response.data, this.router);
            } else {
              this.alertService.alert(
                'Login failed. Username or password maybe incorrect!',
                ALERT_TYPE.ERROR
              );
            }
          },
          error: (error:any) => {
            this.alertService.alert(
              'Login failed. Username or password maybe incorrect!',
              ALERT_TYPE.ERROR
            );
          },
        });
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
