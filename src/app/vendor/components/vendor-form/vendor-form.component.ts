import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryCode } from '../../../apiTypes/countrycode';
import { CountryCodeService } from '../../../../services/country-code.service';
import { VendorServiceService } from '../../services/vendor-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoWhitespaceValidator } from '../../../shared/Validators/validators';
import { Patterns } from '../../../shared/Validators/patterns';
import { Messages } from '../../../shared/Validators/validation-messages';

@Component({
  selector: 'app-vendor-form',
  standalone: false,
  templateUrl: './vendor-form.component.html',
  styleUrl: './vendor-form.component.scss',
})
export class VendorFormComponent implements OnInit {
  vendorForm!: FormGroup;
  isEdit = false;
  countryCodes!: CountryCode[];
  selectedCountryCode: string = '';
  isEditMode: boolean = false;
  vendorId: number | null = null;
  validationMessages = Messages.validation_messages;
  isLoading = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private countryCodeService: CountryCodeService,
    private vendorservice: VendorServiceService,
    private router: Router,
    private message: MatSnackBar,
  ) {
    this.vendorForm = this.fb.group({
      vendorId: [0],
      name: ['', Validators.compose([NoWhitespaceValidator, Validators.required,Validators.pattern(Patterns.titleRegex), Validators.maxLength(100)])],
      description:['', Validators.compose([NoWhitespaceValidator, Validators.required,Validators.pattern(Patterns.titleRegex), Validators.maxLength(150)])],
      phoneNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.maxLength(12)])],
      countryCode: [null,Validators.required],
      contactPersonName: ['', Validators.compose([NoWhitespaceValidator, Validators.required,Validators.pattern(Patterns.titleRegex), Validators.maxLength(150)])],
      servicesProvided: ['', Validators.compose([NoWhitespaceValidator, Validators.required,Validators.pattern(Patterns.titleRegex), Validators.maxLength(150)])],
      contactPersonNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required,, Validators.pattern(Patterns.Num), Validators.maxLength(150)])],
      email: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.emailRegex), Validators.maxLength(150)])],
      website: ['', Validators.compose([NoWhitespaceValidator, Validators.required])],

    });
   }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.vendorId = +id;
        this.loadVendorDetails(this.vendorId);
      } else {
        this.isLoading = false;
      }
    });
   
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        //load vendor to edit
      }
    });
    this.countryCodes = this.countryCodeService.getCountryCodes();

  }


  onSubmit(): void {
    if (this.vendorForm.valid) {
      if (this.isEditMode && this.vendorId) {
        // Update employee
        this.vendorForm.patchValue({
          address: 'addresisstatic'
        });
        this.vendorservice
          .updatevendor(this.vendorId, this.vendorForm.value)
          .subscribe({
            next: () => {
              this.showSuccessMessage('Vendor updated successfully!');
              this.router.navigate(['./'], { relativeTo: this.route.parent });
            },
            error: (err) => {
              this.showErrorMessage(
                'Failed to update Vendor: ' + err.message
              );
            },
          });
      } else {
       
        // Create new employee
        this.vendorservice.createvendor(this.vendorForm.value).subscribe({
          next: () => {
            this.showSuccessMessage('Employee created successfully!');
            this.router.navigate(['./'], { relativeTo: this.route.parent });
          },
          error: (err) => {
            this.showErrorMessage('Failed to create employee: ' + err.message);
          },
        });
      }
    } else {
      this.showErrorMessage('Please fill in all required fields correctly.');
    }
  }
  isValid(): boolean {
    return this.vendorForm.valid;
  }
  public markFormFieldsAsDirty(): void {
    if (this.vendorForm) {
      Object.keys(this.vendorForm.controls).forEach((key) => {
        const control = this.vendorForm.get(key);
        if (control) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }
  loadVendorDetails(id: number): void {
    this.vendorservice.getvendorById(id).subscribe({
      next: (employeeData) => {
        this.vendorForm.patchValue(employeeData.data);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load employee data.');
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
 



