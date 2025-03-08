import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementService } from '../../Services/user-management.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
loading:boolean= true;
  userForView:any
  
constructor(
    private route: ActivatedRoute,
    private userManagementService:UserManagementService,
  ) {
    
  }
  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const id = params['id']; // Get employee ID from the route
        this.GetUserById(id);
      });
    }
  
   GetUserById(id:any) {
       this.loading = true;
       const model = { id: id }; // ✅ Directly create object
       this.userManagementService.getUserById(model)
         .pipe(finalize(() => (this.loading = false))) // ✅ Ensure loading is reset
         .subscribe({
           next: (result: any) => { // ✅ Explicitly define type (Consider using an interface)
             if (result.success) {
               debugger; // ✅ Moved inside `if` block
     
               this.userForView=result.data;
     
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
     
}
