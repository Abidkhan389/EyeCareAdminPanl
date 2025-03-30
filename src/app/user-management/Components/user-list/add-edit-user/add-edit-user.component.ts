import { CommonModule } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { MaterialModule } from 'src/app/material.module';
import { ROLES } from 'src/app/shared/models/ROLES';
import { SharedModule } from 'src/app/shared/shared.module';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { UserManagementService } from 'src/app/user-management/Services/user-management.service';

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [MaterialModule, CommonModule, SharedModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent {
  isDoctor = false;
  UserForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  userList: any;
  RolesList: any;
  hide = signal(true);
  minDate: Date = new Date(); // Today's date
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 4));
  constructor(private userManagementService: UserManagementService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditUserComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.getAllRoles();
    this.validateform();
    if (this.data.userId) {
      this.GetUserById()
    }
  }
  validateform() {
    this.UserForm = this.fb.group({
      email: ['', Validators.compose([NoWhitespaceValidator, Validators.required,Validators.pattern(Patterns.emailOrPhoneRegex), Validators.maxLength(80)])],
      firstName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(20)])],
      lastName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(20)])],
      password: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      mobileNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.minLength(11), Validators.maxLength(11)])],
      cnic: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.CnicPattern), Validators.minLength(15), Validators.maxLength(15)])],
      city: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(20)])],
      roleId: [null, Validators.required],
      fee: [null]
    });     
  }

  //Getting Roles
  getAllRoles() {
    this.loading = true;
    this.userManagementService.getAllRoles().pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.RolesList = result.data;
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  GetUserById() {
    this.loading = true;

    const model = { id: this.data.userId }; // ✅ Directly create object

    this.userManagementService.getUserById(model)
      .pipe(finalize(() => (this.loading = false))) // ✅ Ensure loading is reset
      .subscribe({
        next: (result: any) => { // ✅ Explicitly define type (Consider using an interface)
          if (result.success) {
          // ✅ Moved inside `if` block

            const formattedCNIC = this.formatCNICValue(result.data.cnic || '');
             this.UserForm.patchValue({ ...result.data, cnic: formattedCNIC });

            //this.checkFormValidity(this.UserForm);
            this.isDoctor = result.data.roleName === ROLES.Doctor;
            this.updateDoctorValidators();
            // ✅ Remove password validation & disable field
            const passwordControl = this.UserForm.get('password');
            passwordControl?.clearValidators();
            passwordControl?.updateValueAndValidity();
            passwordControl?.disable();
          } else {
            showErrorMessage(result.message);
          }
        },
        error: (error: any) => { // ✅ Explicitly define type
          console.error("Error fetching user:", error);
          showErrorMessage(ResultMessages.serverError);
        }
      });
  }
  formatCNICValue(cnic: string): string {
    const digits = cnic.replace(/\D/g, '');
    if (digits.length >= 13) {
      return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
    }
    return digits; // Return unformatted if invalid length
  }
  // checkFormValidity(form: FormGroup): void {
  //   Object.keys(form.controls).forEach((field) => {
  //     const control = form.get(field);
  //     if (control && control.invalid) {
  //       console.log(`❌ Field: ${field}`, control.errors);
  //     }
  //   });
  
  //   console.log('✅ Form Valid Status:', form.valid);
  // }
  updateDoctorValidators() {
    if (this.isDoctor) {
      this.UserForm.get('fee')?.setValidators([Validators.required]);
    } else {
      this.UserForm.get('fee')?.clearValidators();
    }
    this.UserForm.get('fee')?.updateValueAndValidity();
  }
  AddEdit() {
    
    this.loading = true;
    let model = Object.assign({}, this.UserForm.getRawValue());
    if(model.fee=="")
      model.fee=null;
    if (this.data.userId)
      model.id = this.data.userId
    this.userManagementService.addEditUser(model).subscribe((data: any) => {
      if (data.success) {
        showSuccessMessage(data.message);
        this.dialogref.close(true);
      }
      else {
        showErrorMessage(data.message);
        this.loading = false;
      }
    });
  }
  formatCNIC(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 5) value = value.slice(0, 5) + '-' + value.slice(5);
    if (value.length > 13) value = value.slice(0, 13) + '-' + value.slice(13);
    this.UserForm.controls['cnic'].setValue(value, { emitEvent: false });
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
  onRoleChange(): void {
    const selectedRole = this.RolesList.find(
      (r: any) => r.id === this.UserForm.get('roleId')?.value
    );
    this.isDoctor = selectedRole?.name === 'Doctor';

    if (this.isDoctor) {
      this.UserForm.get('fee')?.setValidators([Validators.required]);
    } else {
      this.UserForm.get('fee')?.clearValidators();
      this.UserForm.get('fee')?.setValue('');
    }
    this.UserForm.get('fee')?.updateValueAndValidity();
  }
}
