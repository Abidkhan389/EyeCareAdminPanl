import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showSuccessMessage, showErrorMessage } from 'src/app/_common/messages';
import { Table } from 'src/app/interfaces/ITable';
import { MaterialModule } from 'src/app/material.module';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { DoctorAvailabilityService } from '../../Services/doctor-availability.service';
import { AddEditDoctorAvailabilityComponent } from './add-edit-doctor-availability/add-edit-doctor-availability.component';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { DayOfWeek } from 'src/app/_common/_helper/enum';

@Component({
  selector: 'app-doctor-availability-list',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './doctor-availability-list.component.html',
  styleUrl: './doctor-availability-list.component.scss'
})
export class DoctorAvailabilityListComponent {
form: FormGroup;
  loading:boolean= true;
  doctorAvailabilityList:any;
  doctorAvailability: any[] = [];
  modalOptions: NgbModalOptions = {};
  selectedRows = new SelectionModel<any>(true, []);
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['sn.', 'status','doctorName','dayName','doctorTimeSlots','appointmentDurationMinutes','actions'];
  weekDays: { id: number; name: string }[] = [];
  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;

  constructor(private doctorAvailabilityService:DoctorAvailabilityService, private dilog: MatDialog, private fb: FormBuilder,private modalService: NgbModal,
      protected router: Router,private route: ActivatedRoute,private message: MatSnackBar,private confirmationService: ConfirmationService){
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
    this.weekDays = Helpers.enumToArray(DayOfWeek) as { id: number; name: string }[];
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAlldoctorAvailability();
  }
  validateForm(){
    this.form= this.fb.group({
      dayId: [null],
    })
  }
  updateStatus(event: any, doctorAvailability: any) {
    this.loading = true;
    
    let model = {
      id: doctorAvailability.availabilityId,
      status: event ? 1 : 0
    };
  
    this.doctorAvailabilityService.activeInActive(model)
      .pipe(
        finalize(() => {
          this.loading = false;  // Ensure loading false after API completes
        })
      )
      .subscribe(
        data => {
          if (data.success) {
            showSuccessMessage(data.message);
            doctorAvailability.status = event;
          } else {
            showErrorMessage(data.message);
            doctorAvailability.status = !event;
          }
        },
        error => {
          doctorAvailability.status = event ? 0 : 1;
          showErrorMessage(ResultMessages.serverError);
        }
      );
  }
  
  // On Advance Search Submit
  onSubmit() {
    this.tableParams.start = 0;
    this.fetchAlldoctorAvailability();
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAlldoctorAvailability();
  }
   //Reset Form Values on Advance Search
   resetTable() {
    this.form.reset();
    this.fetchAlldoctorAvailability();
  }
  onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAlldoctorAvailability()
  }
  fetchAlldoctorAvailability(){
    this.loading = true;
    Object.assign(this.tableParams, this.form.value);
    this.doctorAvailabilityService.getAllByProc(this.tableParams).subscribe({
      next: (response) => {
        debugger
        this.count = response.data.totalCount;
        this.dataSource = response.data.dataList;
        if (this.count == 0) {
          this.noData = true;
        }
        else{
          this.noData = false
        }
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.showErrorMessage('Failed to load doctorAvailability List data.');
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

  AddEdit(Id?: any)
   {
    debugger
    const dialogref = this.dilog.open(AddEditDoctorAvailabilityComponent, {
      disableClose: true,
      autoFocus: false,
      width: '60%',
      data: {
        id: Id,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAlldoctorAvailability();
        }
      },
    });
   }

  ViewDoctorAvailability(id: any): void {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }
  getFormattedTimeSlots(timeSlots: { startTime: string, endTime: string }[] | undefined): string {
    if (!timeSlots || timeSlots.length === 0) {
      return 'N/A';  // Agar time slots empty ho to "N/A" show karein
    }
  
    return timeSlots
      .map(slot => {
        const start = this.convertTo12HourFormat(slot?.startTime);
        const end = this.convertTo12HourFormat(slot?.endTime);
  
        return start && end ? `${start} - ${end}` : 'Invalid Time';
      })
      .join(', ');
  }
  
  convertTo12HourFormat(time?: string): string {
    if (!time) return 'Invalid Time'; // Agar time null/undefined ho to safe return karein
  
    const timeParts = time.split(':');
    if (timeParts.length < 2) return 'Invalid Time'; // Agar format galat ho to handle karein
  
    const [hours, minutes] = timeParts.map(Number);
    if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time'; // Agar number nahi hai to return karein
  
    const date = new Date();
    date.setHours(hours, minutes);
  
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  
  
  
}
