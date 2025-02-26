import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { UserManagementService} from '../../Services/user-management.service'
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import {
  AppResourceServiceService,
  ResourceTypes,
} from '../../../../services/app-resource-service.service';
import { AspNetRole } from 'src/app/apiTypes/aspnetrole';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { ROLES } from 'src/app/shared/models/ROLES';
@Component({
  selector: 'app-usermanagement-form',
  templateUrl: './usermanagement-form.component.html',
  styleUrl: './usermanagement-form.component.scss'
})
export class UsermanagementFormComponent {
   userForm!: FormGroup;
    routeId: number | null = null;
    isLoading = true;
    isEditMode:boolean=false;
    userId:any;
    validationMessages = Messages.validation_messages;
      roleList: AspNetRole[] = [];
      filteredRoles = [];
    
    constructor(
        private fb: FormBuilder,private resourceservice: AppResourceServiceService,
          private route: ActivatedRoute,
          private UserManagementService : UserManagementService,
          private router: Router,
          private message: MatSnackBar,
    )
    {

    }
      ngOnInit() {
        this.validateForm();
        this.loadRoles();                
        this.route.params.subscribe((params) => {
          const id = params['id'];
          if (id) {
            this.isEditMode = true;
            this.userId = id;
            this.loadRouteDetails();
          } 
        });

       
      }
      loadRoles(){
         this.resourceservice.getRoles().subscribe({
              next: (response: RepoResponse<AspNetRole[]>) => {
                if (response.success) {
                  this.roleList = response.data;
                  const loggedInUserRole = localStorage.getItem('roles');
                  this.roleList = loggedInUserRole !== ROLES.SuperAdmin ? this.roleList.filter(role => role.name !== ROLES.SuperAdmin) : this.roleList;
                }
              },
            });
      }
      loadRouteDetails(){
        this.UserManagementService.GetUserByIdAsync(this.userId).subscribe({
          next: (response: RepoResponse<any[]>) => {
            if (response.success) {
              this.userForm.patchValue(response.data); 
              this.isLoading = false;
            }
          },
          error: (err) => {
            this.isLoading = false;
          },
        });
      }
      validateForm(){
         this.userForm = this.fb.group({
              userId: [null],
              firstName: ['',Validators.compose([NoWhitespaceValidator,Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100),]),],
              lastName: ['',Validators.compose([NoWhitespaceValidator,Validators.required, Validators.maxLength(100),]),],
              emailorPhone: ['',Validators.compose([NoWhitespaceValidator,Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(100),]),],
              employeeTypeId: [null, Validators.required],
              isActive: [true],
            });
            this.isLoading = false;
      }
      onSubmit(){
            let model = Object.assign({}, this.userForm.getRawValue());
            if(this.userId != null)
              model.userId=this.userId;
            this.UserManagementService.AddEditUserAsync(model).subscribe({
          next: (response: RepoResponse<any[]>) => {
            if (response.success) {
              // if(this.imageChange)
              // {
              //   this.fileUploadMethod();
              // }
              if(this.userId)
              {
                this.showSuccessMessage('User  updated successfully!');
              }
              else{
                this.showSuccessMessage('User  Created successfully!');

              }
              this.isLoading = false;
            this.router.navigate(['./'], { relativeTo: this.route.parent });
            }
          },
          error: (err) => {
            this.showErrorMessage('User Profile Can not be Updated  successfully');
            this.isLoading = false;
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
