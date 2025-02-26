import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileSettingService } from '../../Services/profile-setting.service';
import { Messages } from '../../../shared/Validators/validation-messages';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { Observable } from 'rxjs';
import { IBrand } from 'src/app/shared/models/brand';
import { BrandService } from 'src/app/shared/services/brand.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.scss'
})
export class ProfileSettingComponent implements OnInit {
  UserForm : FormGroup
  brand$!: Observable<IBrand>;
  validationMessages = Messages.validation_messages;
  isLoading:boolean=true;
  hidePassword = true;
  oldPassword:any;
  selectedFile:any;
  entityId:any;
  userId:any;
  oldPicture:any;
  imageChange:boolean=false;
  profilePicture: string;
  selectedTab: string = '';
  selectedIndex: number = 0; // Default to the first tab
  constructor(private fb:FormBuilder , private profileSettingService : ProfileSettingService,private message: MatSnackBar,
     private brandService: BrandService,private route: ActivatedRoute,private router: Router
    ){
    this.ValidateForm();
    this.loadUserInfo();
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedTab = params['tab'];
      switch (this.selectedTab) {
        case 'profile':
          this.selectedIndex = 0;  // Profile tab
          break;
        case 'subscription':
          this.selectedIndex = 1;  // Subscription tab
          break;
          case 'security':
            this.selectedIndex = 3;  // security tab
            break;
          case 'invoice':
            this.selectedIndex = 4;  // invoice tab
            break;
        default:
          this.selectedIndex = 0;  // Default to Profile tab
          break;
      }
      this.isLoading = false; // Assume data is loaded after setting the tab
    });
    this.brand$ = this.brandService.brand$;
  }

  loadUserInfo()
  {
    let model = Object.assign({});
    model.email=localStorage.getItem('email');
    model.userId= localStorage.getItem('id');

    this.profileSettingService.GetUserByIdAsync(model).subscribe({
      next: (response: RepoResponse<any[]>) => {
        if (response.success) {
          this.UserForm.patchValue(response.data); 
          this.oldPassword= this.UserForm.get('password')?.value;
          this.entityId=this.UserForm.get('entityId')?.value;
          this.userId=this.UserForm.get('userId')?.value;
          this.selectedFile= this.UserForm.get('profilePicture')?.value;
          const profileImage =this.UserForm.get('profilePicture')?.value;
          this.oldPicture = profileImage ? `/UploadedFiles/${profileImage}` : '/assets/images/profile/user-1.jpg' ;
          this.profilePicture =profileImage ? `/UploadedFiles/${profileImage}` : '/assets/images/profile/user-1.jpg';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  
  ValidateForm()
  {
    this.UserForm = this.fb.group({
      userId: ['' ], // UserId is required and should match the type (string)
      entityId: [''], // entityId is required and should match the type (string)
      firstName: ['', [
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100)
        ])
      ]],
      lastName: ['', [
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.titleRegex),
          Validators.maxLength(100)
        ])
      ]],
      profilePicture: [''], // ProfilePicture is optional
      phoneNumber: ['', [
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.Num),
          Validators.maxLength(15) // Assuming max length for phone numbers
        ])
      ]],
      email: ['', [
        Validators.compose([
          NoWhitespaceValidator,
          Validators.required,
          Validators.pattern(Patterns.emailRegex),
          Validators.maxLength(100)
        ])
      ]],
      password: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.passwordRegex),Validators.minLength(4),
          Validators.maxLength(20),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          NoWhitespaceValidator,
          Validators.pattern(Patterns.passwordRegex),Validators.minLength(4),
          Validators.maxLength(20),
        ]),
      ],
      PasswordChange: [false] // Boolean default value
    },
    { validator: this.comparePasswords }
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
      this.UserForm.get('confirmPassword')?.hasError('passwordMismatch') &&
      this.UserForm.get('confirmPassword')?.touched
    );
  }
  onFormSubmit(){
    let model = new FormData(); // Create a FormData object

// Append regular form data
const formValues = this.UserForm.getRawValue();
Object.keys(formValues).forEach((key) => {
  model.append(key, formValues[key]);
});

// Check if the password has changed
let newPassword = this.UserForm.get('password')?.value;
if (this.oldPassword !== newPassword) {
  model.append('PasswordChange', 'true');
} else {
  model.append('PasswordChange', 'false');
}
model.append('EntityType', "Profile");
// Append the selected file if present
if (this.selectedFile) {
  model.append('File', this.selectedFile);  
}
    this.profileSettingService.UpdateUserAsync(model).subscribe({
      next: (response: RepoResponse<any[]>) => {
        if (response.success) {
          // if(this.imageChange)
          // {
          //   this.fileUploadMethod();
          // }
          this.showSuccessMessage('User Profile updated successfully!');
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.showErrorMessage('User Profile Can not be Updated  successfully');
        this.isLoading = false;
      },
    });
    
   
  }
  fileUploadMethod()
  {
    const formData = new FormData();
  formData.append('File', this.selectedFile); // Must match the backend property name
  formData.append('EntityType', 'Profile'); // Example data, replace as needed
  formData.append('EntityId', this.entityId.toString()); // Ensure it's a string
  formData.append('UserId', this.userId);
    this.profileSettingService.fileUpload(formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully', response);
      },
      error: (err) => {
        console.error('Error uploading file', err);
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
  onFileSelected(event:any)
  {
    const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    this.selectedFile=file;

    console.log('File selected:', this.selectedFile); 
    // Example: Convert the file to a base64 string for storing in the form control
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;

      // Update the form control with the base64 string
      this.UserForm.get('profilePicture')?.setValue(base64String);
      this.profilePicture = base64String;
      this.imageChange=true;
    };
    

    reader.readAsDataURL(file); // Read the file as a base64 data URL
  }
  }
  resetPicture()
  {
    this.selectedFile=this.oldPicture;
    this.profilePicture = this.oldPicture;
    this.imageChange=false;
  }
  isAdminOrSuperAdmin(): boolean {
    const userRole = localStorage.getItem('roles');
    // Check if the role is Admin or SuperAdmin
    return userRole=== 'ADMIN' || userRole === 'SUPERADMIN';
  }
}
