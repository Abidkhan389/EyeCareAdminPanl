import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ConfirmationService } from '../shared/services/confirmation.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ClassRoom } from '../../apiTypes/classroom';
import { ClassroomService } from '../services/classroom.service';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { AppResourceServiceService } from '../../../services/app-resource-service.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ConfirmationService } from '../../shared/services/confirmation.service';
import { ClassRoomManagegementComponent } from '../class-room-managegement/class-room-managegement.component';
import { ClassRoomManagementService } from '../services/class-room-management.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-classroomlist',
  templateUrl: './classroomlist.component.html',
  styleUrl: './classroomlist.component.scss',
})
export class ClassroomlistComponent implements OnInit {
  //classrooms: ClassRoom[] = [];
  isVisible: boolean = false;
  isClassRoomManagementEdit: boolean = false;
  isLoading = true;
  classRoomsList:any[]=[];
  classRoomName:any;
  selectedRows = new SelectionModel<ClassRoom>(true, []);
  classrooms!: MatTableDataSource<ClassRoom>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columns: string[] = [
    'select',
    'classroomName',
    'classroomCapacity',
    'classroomLevel',
    'registeredStudentsCount',
    'actions',
  ];

  constructor(
    private classroomservice: ClassroomService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private resourceService: AppResourceServiceService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private classRoomManagementService:ClassRoomManagementService
  ) {}
  ngOnInit(): void {
    this.getAllClassRooms();
  }
  getAllClassRooms() {
    this.classroomservice.getClassRooms().subscribe({
      next: (response: RepoResponse<ClassRoom[]>) => {
        if (response.success) {
          this.classrooms = new MatTableDataSource(response.data);
          this.classRoomsList=response.data;
          this.classrooms.paginator = this.paginator; 
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  editClassRoom(classroomId: number): void {
    this.router.navigate([`edit/${classroomId}`], { relativeTo: this.route });
  }

  viewClassRoom(classroomId: number): void {
    this.router.navigate(['view', classroomId], { relativeTo: this.route });
  }
  ManageClassSubjects(classroomId: number): void {
    this.router.navigate(['managesubjects', classroomId], { relativeTo: this.route });
  }
  ManageClassStudents(classroomId: number): void {
    this.getClassRoomName(classroomId);
    this.router.navigate(['manageStudents', classroomId], { 
      relativeTo: this.route
    });
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.classrooms.data);
  }
  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.classrooms.data.length;
    return numSelected === numRows;
  }
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.classrooms.filter = filterValue;

    if (this.classrooms.paginator) {
      this.classrooms.paginator.firstPage();
    }
  }
  selectClassRoom(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
  createClassRoom() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  deleteClassRoom(classroomId: any) {
    this.confirmationService.confirmDelete().then((result: any) => {
      if (result.isConfirmed) {
        this.classroomservice.deleteClassRoom(classroomId).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            this.getAllClassRooms();
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
  deleteSelectedClassrooms(): void {
    let selectedIds = this.selectedRows.selected.map((row) => row.classRoomId);
    if (selectedIds.length > 0) this.deleteClassRoom(selectedIds);
    this.selectedRows.clear(); // Clear the selection
  }
  getClassRoomName(classRoomId:number){
    this.classRoomName=this.classRoomsList.find(f => f.classRoomId === classRoomId)?.classroomName;
    localStorage.setItem('classRoomName', this.classRoomName);
  }
  ClassRoomManagegement(Id?: any) {

    // this.classRoomManagementService.getClassRoomManagementById(Id).subscribe({
    //   next: (response: RepoResponse<any[]>) => {
    //     if (response.success) {
      
    //       this.isClassRoomManagementEdit = true;
    //     }
    //   },
    //   error: (err) => {
    //     this.isClassRoomManagementEdit = false;
    //   },
    // });
    // const dialogref = this.dialog.open(ClassRoomManagegementComponent, {

      
    //   disableClose: true,
    //   autoFocus: false,
    //   width: '120vw',  // 80% of the viewport width
    //   height: '80vh', // 80% of the viewport height
    //   data: {
    //     classRoomId: Id,
    //     isClassRoomManagementEdit: this.isClassRoomManagementEdit
    //   },
    // })
    // dialogref.afterClosed().subscribe({
    //   next: (value) => {
    //     if (value) {
    //       this.getAllClassRooms();
    //     }
    //   },
    // });
  }
}
