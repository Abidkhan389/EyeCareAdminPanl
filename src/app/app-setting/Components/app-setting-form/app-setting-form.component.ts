import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Messages } from '../../../shared/Validators/validation-messages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryCodeService } from '../../../../services/country-code.service';
import { Patterns } from '../../../shared/Validators/patterns';
import { NoWhitespaceValidator } from '../../../shared/Validators/validators';
import { VendorServiceService } from '../../../vendor/services/vendor-service.service';
import { AppSettingService } from '../../Service/app-setting.service';
import { CurrencyCode } from 'src/app/apiTypes/currencycode';
import { CurrencyCodeService } from 'src/services/currency-code.service';
import { CountryCode } from 'src/app/apiTypes/countrycode';

@Component({
  selector: 'app-app-setting-form',
  templateUrl: './app-setting-form.component.html',
  styleUrl: './app-setting-form.component.scss'
})
export class AppSettingFormComponent {
  appSettingForm!: FormGroup;
  isEdit = false;
  isEditMode: boolean = false;
  appSettingId: number | null = null;
  validationMessages = Messages.validation_messages;
  currencies !: CurrencyCode[];
  countryCodes!: CountryCode[];
  gradeReportFrequency: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private appSettingService:AppSettingService,
    private router: Router,
    private message: MatSnackBar,
    private currencyCodeService: CurrencyCodeService,
    private countryCodeService: CountryCodeService,
  ) {
    this.appSettingForm = this.fb.group({
      appSettingId: [0],
      appSettingName: ['', Validators.compose([NoWhitespaceValidator, Validators.required,Validators.pattern(Patterns.titleRegex), Validators.maxLength(100)])],
      appSettingValue:['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.maxLength(150)])],
      appSettingDescription:['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(500)])],
    });
   }
   isLoading = true;
   ngOnInit(): void {
    this.gradeReportFrequency = [
      { id: '1', name: '1 Month' },
      { id: '2', name: '2 Month' },
      { id: '3', name: '3 Month' },
      { id: '4', name: '4 Month' },
      { id: '5', name: '5 Month' },
      { id: '6', name: '6 Month' },
      { id: '7', name: '7 Month' },
      { id: '8', name: '8 Month' },
      { id: '9', name: '9 Month' },
      { id: '10', name: '10 Month' }
    ];
     this.route.params.subscribe((params) => {
       const id = params['id'];
       if (id) {
         this.isEditMode = true;
         this.appSettingId = +id;
         this.loadAppSettingDetails(this.appSettingId);
       } else {
         this.isLoading = false;
       }
     });
     this.currencies = this.currencyCodeService.getCurrencyCodes();
     this.countryCodes = this.countryCodeService.getCountryCodes();
   }
   onSubmit(): void {
    if (this.appSettingForm.valid) {
      if (this.isEditMode && this.appSettingId) {
        // Update employee
        this.appSettingForm.patchValue({
          address: 'addresisstatic'
        });
        this.appSettingService
          .updateAppSetting(this.appSettingId, this.appSettingForm.value)
          .subscribe({
            next: () => {
              this.showSuccessMessage('App Setting updated successfully!');
              this.router.navigate(['./'], { relativeTo: this.route.parent });
            },
            error: (err) => {
              this.showErrorMessage(
                'Failed to update App Setting: ' + err.message
              );
            },
          });
      } 
    } else {
      this.showErrorMessage('Please fill in all required fields correctly.');
    }
  }

   isValid(): boolean {
    return this.appSettingForm.valid;
  }
  public markFormFieldsAsDirty(): void {
    if (this.appSettingForm) {
      Object.keys(this.appSettingForm.controls).forEach((key) => {
        const control = this.appSettingForm.get(key);
        if (control) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
 
  loadAppSettingDetails(id: number): void {
    this.appSettingService.getAppSettingById(id).subscribe({
      next: (employeeData) => {
        this.appSettingForm.patchValue(employeeData.data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load App Setting Data.');
      },
    });
  }
  showSuccessMessage(successMessage:string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'] // Optional: for custom styling
    });
  }
  showErrorMessage(failMessage:string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'] // Optional: for custom styling
    });
  }
}
