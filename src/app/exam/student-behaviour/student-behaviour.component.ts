import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import Swal from 'sweetalert2';
import { StudentBehaviourService } from '../services/student-behaviour.service';
import { MatDialog } from '@angular/material/dialog';
import { PayrollViewComponent } from 'src/app/billing/components/payroll-dashboard/payroll-view/payroll-view.component';
import { AddEditStudentBehaviourComponent } from './add-edit-student-behaviour/add-edit-student-behaviour.component';
import { StudentBehaviourViewComponent } from './student-behaviour-view/student-behaviour-view.component';

@Component({
  selector: 'app-student-behaviour',
  templateUrl: './student-behaviour.component.html',
  styleUrl: './student-behaviour.component.scss'
})
export class StudentBehaviourComponent implements OnInit{
 studentBehaviourList:any[]=[];
  isLoading:boolean=true;
  isVisible: boolean = false;
  classId:number;
  subjectId:number
   selectedRows = new SelectionModel<any>(true, []);
   studentBehaviour!: MatTableDataSource<any>;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   columns: string[] = [
      'select',
      'SutdenttName',
      'SubjectName',
      'ClassRoomName',
      'SeverityLevel',
      'BehaviourType',
      'ReportedBy',
     // 'Category',
     // 'Location',
      //'FollowUpDetails',
      //'NotificationDetails',
     // 'ResolutionStatus',
      'actions',
   ];
  
 constructor (private studentbehaviourService : StudentBehaviourService, private message: MatSnackBar,private dialog: MatDialog,
   private confirmationService: ConfirmationService,private route: ActivatedRoute,private router: Router){

 }
 ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.classId = +params['classId'];
    this.subjectId = +params['subjectId'];

  });
  this.loadStudentBehaviourList();
 }


 loadStudentBehaviourList() {
  this.studentbehaviourService.GetUstudentBehaviourListAsync().subscribe({
    next: (response) => {
      this.studentBehaviour = new MatTableDataSource(response.data);
      this.studentBehaviourList=response.data;
      this.studentBehaviour.paginator = this.paginator; 
      this.isLoading = false;
    },
    error: (err) => {
      this.isLoading = false;
      this.showErrorMessage('Failed to load Student Behaviour List data.');
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

 
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.studentBehaviour.data);
  }
  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.studentBehaviour.data.length;
    return numSelected === numRows;
  }
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.studentBehaviour.filter = filterValue;

  if (this.studentBehaviour.paginator) {
    this.studentBehaviour.paginator.firstPage(); // Reset paginator to the first page
  }
  }
  selectClassRoom(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
 

  StudentBehaviourDelete(Id: any) {
    this.confirmationService.confirmDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.studentbehaviourService.StudentBehaviourDeleteAsync (Id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            this.loadStudentBehaviourList();
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
  deleteSelectedStudentBehaviour(): void {
    let selectedIds = this.selectedRows.selected.map((row) => row.classRoomId);
    if (selectedIds.length > 0) this.StudentBehaviourDelete(selectedIds);
    this.selectedRows.clear(); // Clear the selection
  }

   AddEditStudentBehaviour(Id?:any): void {
      const dialogref = this.dialog.open(AddEditStudentBehaviourComponent, {
        disableClose: true,
        autoFocus: false,
        width: '80%',
        data: {
         studentBehaviourId: Id,
         classId:this.classId,
         subjectId:this.subjectId
        },
      })
      dialogref.afterClosed().subscribe({
        next: (value) => {
          if (value) {
           
          }
        },
      });
    }
    
    viewstudentBehaviour(Id?:any): void {
      const dialogref = this.dialog.open(StudentBehaviourViewComponent, {
        disableClose: true,
        autoFocus: false,
        width: '80%',
        data: {
         studentBehaviourId: Id
        },
      })
      dialogref.afterClosed().subscribe({
        next: (value) => {
          if (value) {
            this.loadStudentBehaviourList();
          }
        },
      });
    }
}
