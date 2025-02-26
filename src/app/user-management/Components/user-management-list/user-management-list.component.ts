import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService} from '../../Services/user-management.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrl: './user-management-list.component.scss'
})
export class UserManagementListComponent implements OnInit{
  userList:any[]=[];
  isLoading:boolean=true;
  isVisible: boolean = false;
   selectedRows = new SelectionModel<any>(true, []);
   users!: MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   columns: string[] = [
      'select',
      'FirstName',
      'LastName',
      'EmailOrPhone',
      'actions',
   ];
  
 constructor (private UserManagementService : UserManagementService, private message: MatSnackBar,
   private confirmationService: ConfirmationService,private route: ActivatedRoute,private router: Router){

 }
 ngOnInit(): void {
  this.loadUserList();
 }


 loadUserList() {
  this.UserManagementService.GetUserListAsync().subscribe({
    next: (response) => {
      this.users = new MatTableDataSource(response.data);
      this.userList=response.data;
      this.users.paginator = this.paginator; 
      this.isLoading = false;
    },
    error: (err) => {
      this.isLoading = false;
      this.showErrorMessage('Failed to load User List data.');
    },
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

 showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  edituser(userId: string): void {
    this.router.navigate([`edit/${userId}`], { relativeTo: this.route });
  }
  createUser(): void {
    this.router.navigate([`create`], { relativeTo: this.route });
  }

  viewuser(userId: string): void {
    this.router.navigate(['view', userId], { relativeTo: this.route });
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.users.data);
  }
  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.users.data.length;
    return numSelected === numRows;
  }
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.users.filter = filterValue;

  if (this.users.paginator) {
    this.users.paginator.firstPage(); // Reset paginator to the first page
  }
  }
  selectClassRoom(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
 

  deleteUser(classroomId: any) {
    this.confirmationService.confirmDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.UserManagementService.deleteUsers(classroomId).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            this.loadUserList();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Failed to delete data. Please try again.',
              'error'
            );
          }
        );
      } else if (result.isDismissed) {
        Swal.fire('Cancelled', 'Delete Cancelled', 'error');
      }
    });
  }
  // Function to delete multiple classrooms
  deleteSelectedUsers(): void {
    let selectedIds = this.selectedRows.selected.map((row) => row.classRoomId);
    if (selectedIds.length > 0) this.deleteUser(selectedIds);
    this.selectedRows.clear(); // Clear the selection
  }
}
