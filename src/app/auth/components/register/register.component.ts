import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IBrand } from '../../../shared/models/brand';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { BrandService } from '../../../shared/services/brand.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { AuthService } from '../../services/auth.service';
import { Patterns } from '../../../shared/Validators/patterns';
import { NoWhitespaceValidator } from '../../../shared/Validators/validators';
import { Messages } from '../../../shared/Validators/validation-messages';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  hidePassword = true;
  brand$!: Observable<IBrand>;
  validationMessages = Messages.validation_messages;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private alertService: AlertService,
    private message: MatSnackBar,

  ) {}
  ngOnInit(): void {
    this.brand$ = this.brandService.brand$;
    this.validateform();
   
  }
  validateform() {
    this.registrationForm = this.fb.group(
      {
        userName: [
          '',
          Validators.compose([
            NoWhitespaceValidator,
            Validators.required,
            Validators.pattern(Patterns.emailRegex),
            Validators.maxLength(150),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            NoWhitespaceValidator,
            Validators.required,
            Validators.pattern(Patterns.passwordRegex),Validators.minLength(4),
            Validators.maxLength(20),
          ]),
        ],
        confirmPassword: [
          '',
          Validators.compose([
            NoWhitespaceValidator,
            Validators.required,
            Validators.pattern(Patterns.passwordRegex),Validators.minLength(4),
            Validators.maxLength(20),
          ]),
        ],
      },
      { validator: this.comparePasswords } // Correct syntax
    );
  }
  
  comparePasswords(fb: FormGroup) {
    const passwordCtrl = fb.get('password');
    const confirmPasswordCtrl = fb.get('confirmPassword');
  
    if (confirmPasswordCtrl?.errors == null || !confirmPasswordCtrl.errors['passwordMismatch']) {
      if (passwordCtrl?.value !== confirmPasswordCtrl?.value) {
        confirmPasswordCtrl?.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordCtrl?.setErrors(null);
      }
    }
  }
  
  get passwordMatchError() {
    return (
      this.registrationForm.get('confirmPassword')?.hasError('passwordMismatch') &&
      this.registrationForm.get('confirmPassword')?.touched
    );
  }
  
  onFormSubmit() {
    this.authService.registerUser(this.registrationForm.value).subscribe({
      next: () => {
        this.showSuccessMessage('User created successfully!');
        this.router.navigate(['/authentication/login']);
      },
      error: (err) => {
        this.showErrorMessage('Failed to create User: ' + err.message);
      },
    });
  }
  showSuccessMessage(successMessage: string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'], // Optional: for custom styling
    });
  }
  showErrorMessage(failMessage: string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'], // Optional: for custom styling
    });
  }
}

