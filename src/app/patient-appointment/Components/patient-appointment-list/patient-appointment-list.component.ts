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
import { Patterns } from 'src/app/shared/Validators/patterns';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { PatientAppointmentService } from '../../Services/patient-appointment.service';
import { AddEditPatientAppointmentComponent } from './add-edit-patient-appointment/add-edit-patient-appointment.component';

@Component({
  selector: 'app-patient-appointment-list',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './patient-appointment-list.component.html',
  styleUrl: './patient-appointment-list.component.scss'
})
export class PatientAppointmentListComponent {
 form: FormGroup;
  loading:boolean= true;
  patientAppointmentList:any;
  patientAppointmen: any[] = [];
  modalOptions: NgbModalOptions = {};
  selectedRows = new SelectionModel<any>(true, []);
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['sn.', 'status','firstName','lastName','gender','cnic','patientPhoneNumber','AppointmentTime','CheckUpStatus','doctoerName','actions'];

  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  CurrentMedicineTypeId: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;

  constructor(private patientAppointmentService:PatientAppointmentService, private dilog: MatDialog, private fb: FormBuilder,private modalService: NgbModal,
      protected router: Router,private route: ActivatedRoute,private message: MatSnackBar,private confirmationService: ConfirmationService){
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllPatientAppointment();
  }
  validateForm(){
    this.form = this.fb.group({
      firstName: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
      lastName: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
      city: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
      cnic: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
      mobileNumber: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.Num), Validators.maxLength(50)]]
    });
  }
  updateStatus(event: any, patientAppointment: any) {
    this.loading = true;
    
    let model = {
      id: patientAppointment.patientId,
      status: event ? 1 : 0
    };
  
    this.patientAppointmentService.patientAppointmentStatus(model)
      .pipe(
        finalize(() => {
          this.loading = false;  // Ensure loading false after API completes
        })
      )
      .subscribe(
        data => {
          if (data.success) {
            showSuccessMessage(data.message);
            patientAppointment.status = event;
          } else {
            showErrorMessage(data.message);
            patientAppointment.status = !event;
          }
        },
        error => {
          patientAppointment.status = event ? 0 : 1;
          showErrorMessage(ResultMessages.serverError);
        }
      );
  }
  
  // On Advance Search Submit
  onSubmit() {
    this.tableParams.start = 0;
    this.fetchAllPatientAppointment();
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllPatientAppointment();
  }
   //Reset Form Values on Advance Search
   resetTable() {
    this.form.reset();
    this.fetchAllPatientAppointment();
  }
  onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllPatientAppointment()
  }
  fetchAllPatientAppointment(){
    this.loading = true;
    Object.assign(this.tableParams, this.form.value);
    this.patientAppointmentService.getAllpatientAppointment(this.tableParams).subscribe({
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
        this.showErrorMessage('Failed to load patient Appointment data.');
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
    const dialogref = this.dilog.open(AddEditPatientAppointmentComponent, {
      disableClose: true,
      autoFocus: false,
      width: '60%',
      data: {
        patientId: Id,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllPatientAppointment();
        }
      },
    });
   }

  viewPatientAppointment(id: any): void {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }
}
