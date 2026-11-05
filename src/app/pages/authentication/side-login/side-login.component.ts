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
import { SharedModule } from 'src/app/shared/shared.module';
import { TokenHelper } from 'src/app/_common/tokenHelper';
import { APIToken } from 'src/app/_common/constant';
import { toDataURL } from 'qrcode';

type LoginStep = 'credentials' | 'setup' | 'code' | 'recovery-codes';

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
  ) {

  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
    rememberDevice: new FormControl(false),
  });

  // --- Two-Factor Authentication state ---
  step: LoginStep = 'credentials';
  useRecoveryCode = false;
  qrCodeDataUrl: string | null = null;
  otpSecret: string | null = null;
  recoveryCodes: string[] = [];
  private pendingCredentials: { email: string; password: string; rememberDevice: boolean } | null = null;
  private pendingLoginData: any = null;

  private readonly CODE_PATTERN = /^\d{6}$/;

  twoFactorForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern(this.CODE_PATTERN)]),
  });

  get f() {
    return this.form.controls;
  }

  submit(e: Event) {
    e.preventDefault();

    if (this.form.invalid) {
      return;
    }

    this.pendingCredentials = {
      email: this.form.getRawValue().email ?? '',
      password: this.form.getRawValue().password ?? '',
      rememberDevice: this.form.getRawValue().rememberDevice ?? false,
    };

    this.doLogin(null, null);
  }

  verifyTwoFactor(e: Event) {
    e.preventDefault();

    if (this.twoFactorForm.invalid || !this.pendingCredentials) {
      return;
    }

    const code = this.twoFactorForm.getRawValue().code ?? '';
    this.doLogin(
      this.useRecoveryCode ? null : code,
      this.useRecoveryCode ? code : null
    );
  }

  private doLogin(twoFactorCode: string | null, twoFactorRecoveryCode: string | null) {
    if (!this.pendingCredentials) {
      return;
    }

    this.loadingService.show();

    const model: any = {
      email: this.pendingCredentials.email,
      password: this.pendingCredentials.password,
      twoFactorCode,
      twoFactorRecoveryCode,
      rememberDevice: this.pendingCredentials.rememberDevice,
      trustedDeviceToken: localStorage.getItem(APIToken.trustedDeviceTokenKey),
    };

    this.authService
      .login(model)
      .pipe(
        first(),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (response: any) => this.handleLoginResponse(response),
        error: () => {
          this.alertService.alert(
            'Login failed. Username or password maybe incorrect!',
            ALERT_TYPE.ERROR
          );
        },
      });
  }

  private handleLoginResponse(response: any) {
    if (!response.success) {
      this.alertService.alert(
        response.message ?? 'Login failed. Username or password maybe incorrect!',
        ALERT_TYPE.ERROR
      );
      return;
    }

    const data = response.data;

    if (data?.requiresTwoFactor) {
      this.useRecoveryCode = false;
      this.twoFactorForm.reset();
      this.applyTwoFactorValidators();

      if (data.setupRequired) {
        this.otpSecret = data.secret;
        this.step = 'setup';
        this.generateQrCode(data.otpAuthUri);
      } else {
        this.step = 'code';
      }
      return;
    }

    if (!data) {
      this.alertService.alert(
        'Login failed. Username or password maybe incorrect!',
        ALERT_TYPE.ERROR
      );
      return;
    }

    if (data.recoveryCodes?.length) {
      // First time the authenticator is confirmed - show the one-time recovery
      // codes before finishing the login.
      this.recoveryCodes = data.recoveryCodes;
      this.pendingLoginData = data;
      this.step = 'recovery-codes';
      return;
    }

    this.completeLogin(data);
  }

  private generateQrCode(otpAuthUri: string) {
    this.qrCodeDataUrl = null;
    toDataURL(otpAuthUri)
      .then((url) => (this.qrCodeDataUrl = url))
      .catch(() => {
        this.alertService.alert(
          'Unable to generate the QR code. Please use the manual key instead.',
          ALERT_TYPE.WARNING
        );
      });
  }

  continueAfterRecoveryCodes() {
    if (this.pendingLoginData) {
      this.completeLogin(this.pendingLoginData);
    }
  }

  private completeLogin(data: any) {
    if (data.trustedDeviceToken) {
      localStorage.setItem(APIToken.trustedDeviceTokenKey, data.trustedDeviceToken);
    }
    TokenHelper.setToken(data);
    AuthService.SaveUserInfo(data);
    AuthService.RedirectUserHome(data, this.router);
  }

  toggleRecoveryCode() {
    this.useRecoveryCode = !this.useRecoveryCode;
    this.twoFactorForm.reset();
    this.applyTwoFactorValidators();
  }

  private applyTwoFactorValidators() {
    const control = this.twoFactorForm.get('code');
    if (this.useRecoveryCode) {
      control?.setValidators([Validators.required, Validators.minLength(5)]);
    } else {
      control?.setValidators([Validators.required, Validators.pattern(this.CODE_PATTERN)]);
    }
    control?.updateValueAndValidity();
  }

  backToCredentials() {
    this.step = 'credentials';
    this.pendingCredentials = null;
    this.qrCodeDataUrl = null;
    this.otpSecret = null;
    this.twoFactorForm.reset();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  loginWithGoogle() {
    // Trigger Google login
    this.authService.googleLogin();
  }
}
