import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../Services/user-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-management-view',
  templateUrl: './user-management-view.component.html',
  styleUrl: './user-management-view.component.scss'
})
export class UserManagementViewComponent implements OnInit {
  userDetail!: any | undefined;
  isLoading = true;
  isreadOnly= false;
  constructor(
    private route: ActivatedRoute,
    private userService:UserManagementService ,
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Get employee ID from the route
      this.loadUserDetails(id);
    });
  }

  loadUserDetails(userId: string): void {
    this.userService.GetUserByIdAsync(userId).subscribe({
      next: (response) => {
        this.userDetail=response.data;
        this.isreadOnly = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.isLoading = false;
      },
    });
  }
}
