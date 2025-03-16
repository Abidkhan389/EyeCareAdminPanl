import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'src/app/interfaces/ITable';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { PatientCheckUpDescriptionService } from '../../Services/patient-check-up-description.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showSuccessMessage, showErrorMessage } from 'src/app/_common/messages';
import { AddEditPatientAppointmentComponent } from 'src/app/patient-appointment/Components/patient-appointment-list/add-edit-patient-appointment/add-edit-patient-appointment.component';
import { PatientAppointmentService } from 'src/app/patient-appointment/Services/patient-appointment.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { AddEditPatientCheckupDescriptionComponent } from './add-edit-patient-checkup-description/add-edit-patient-checkup-description.component';

@Component({
  selector: 'app-patientcheckup-description',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './patientcheckup-description.component.html',
  styleUrl: './patientcheckup-description.component.scss'
})
export class PatientcheckupDescriptionComponent {
 form: FormGroup;
  loading:boolean= true;
  patientcheckupHistoryList:any;
  patientcheckupHistory: any[] = [];
  modalOptions: NgbModalOptions = {};
  selectedRows = new SelectionModel<any>(true, []);
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['sn.', 'status','doctorName','fisrtName','lastName','cnic','city','phoneNumber','plan','actions'];

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
  maxDate: string;
  constructor(private patientCheckUpDescriptionService: PatientCheckUpDescriptionService,private patientAppointmentService:PatientAppointmentService, private dilog: MatDialog, private fb: FormBuilder,private modalService: NgbModal,
        protected router: Router,private route: ActivatedRoute,private message: MatSnackBar,private confirmationService: ConfirmationService){
      this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
    }
    ngOnInit(): void {
      const nextMonthDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
      this.maxDate = nextMonthDate.toISOString().split('T')[0]; 
      this.validateForm();
      this.fetchAllPatientAppointmentCheckUpHistory();
    }
    validateForm(){
      this.form = this.fb.group({
        plan: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
        firstName: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
        lasttName: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
        city: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
        cnic: ['', [NoWhitespaceValidator,  Validators.maxLength(50)]],
        phoneNumber: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.Num), Validators.maxLength(50)]],
      
      });
    }
    updateStatus(event: any, patientAppointment: any) {
      this.loading = true;
      
      let model = {
        id: patientAppointment.prescriptionId,
        status: event ? 1 : 0
      };
    
      this.patientCheckUpDescriptionService.activeInActive(model)
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
      this.fetchAllPatientAppointmentCheckUpHistory();
    }
     //Sorting on Coloum With MatSort
     onSort(sort: Sort) {
      this.tableParams.sort = sort.active;
      this.tableParams.order = sort.direction;
      this.tableParams.start = 0;
      this.fetchAllPatientAppointmentCheckUpHistory();
    }
     //Reset Form Values on Advance Search
     resetTable() {
      this.form.reset();
      this.fetchAllPatientAppointmentCheckUpHistory();
    }
    onPaginate(pageEvent: PageEvent) {
      this.tableParams.limit = pageEvent.pageSize
      this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
      this.fetchAllPatientAppointmentCheckUpHistory()
    }
    fetchAllPatientAppointmentCheckUpHistory(){
      this.loading = true;
      Object.assign(this.tableParams, this.form.value);
      this.patientCheckUpDescriptionService.getAllByProc(this.tableParams).subscribe({
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
  
    AddEdit(patient?: any)
     {
      const dialogref = this.dilog.open(AddEditPatientCheckupDescriptionComponent, {
        disableClose: true,
        autoFocus: false,
        width: '60%',
        data: {
          prescriptionObj: patient,
        },
      })
      dialogref.afterClosed().subscribe({
        next: (value) => {
          if (value) {
            this.fetchAllPatientAppointmentCheckUpHistory();
          }
        },
      });
     }
  
    viewPatientAppointment(id: any): void {
      this.router.navigate(['view', id], { relativeTo: this.route });
    }
}
