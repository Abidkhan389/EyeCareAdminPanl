import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'src/app/interfaces/ITable';
import { MaterialModule } from 'src/app/material.module';
import { MedicinetypeService } from 'src/app/medicine-type-management/Services/medicinetype.service';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { DoctorHolidayService } from '../../Services/doctor-holiday.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showSuccessMessage, showErrorMessage } from 'src/app/_common/messages';
import { AddeditmecinetypeComponent } from 'src/app/medicine-type-management/Components/addeditmecinetype/addeditmecinetype.component';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { AddEditDoctorHolidaysComponent } from './add-edit-doctor-holidays/add-edit-doctor-holidays.component';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { DayOfWeek } from 'src/app/_common/_helper/enum';
import { DayNamePopupComponent } from './day-name-popup/day-name-popup.component';

@Component({
  selector: 'app-doctor-holidays-list',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './doctor-holidays-list.component.html',
  styleUrl: './doctor-holidays-list.component.scss'
})
export class DoctorHolidaysListComponent implements OnInit {
  form: FormGroup;
    loading:boolean= true;
    doctorHolidayList:any;
    doctorHoliday: any[] = [];
    modalOptions: NgbModalOptions = {};
    selectedRows = new SelectionModel<any>(true, []);
    dataSource !: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['sn.', 'status','firstName','lastName','fromDate','toDate','dayName','actions'];
  
    pageSize = 5;
    currentPage = 1;
    noData: boolean = false;
    CurrenDoctorHolidayId: any;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    tableParams: Table;
    @ViewChild('myTable') table: any;
    isCollapsed: boolean = true;
    count: number = 0;
    validationMessages = Messages.validation_messages;
    weekDays: { id: number; name: string }[] = [];
    maxDate: string;
    constructor(private doctorHolidayService:DoctorHolidayService, private dialog: MatDialog, private fb: FormBuilder,private modalService: NgbModal,
        protected router: Router,private route: ActivatedRoute,private message: MatSnackBar,private confirmationService: ConfirmationService){
        this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
        this.weekDays = Helpers.enumToArray(DayOfWeek) as { id: number; name: string }[];
      
    }
    ngOnInit(): void {
      const today = new Date();
const nextYearDate = new Date(today);
nextYearDate.setFullYear(today.getFullYear() + 1);

// Ensure `YYYY-MM-DDTHH:MM` format for `datetime-local`
this.maxDate = nextYearDate.toISOString().slice(0, 16); // Fix format


        this.validateForm();
        this.fetchAllDoctorHoliday();
      }
      validateForm(){
        this.form = this.fb.group({
          firstName: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
          lastName: ['', [NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)]],
          fromDate: [null],
          toDate: [null],
          // dayOfWeek: [null],
        });
      }
      updateStatus(event: any, doctorHoliday: any) {
        this.loading = true;
        
        let model = {
          id: doctorHoliday.doctorHolidayId,
          status: event ? 1 : 0
        };
      
        this.doctorHolidayService.activeInActive(model)
          .pipe(
            finalize(() => {
              this.loading = false;  // Ensure loading false after API completes
            })
          )
          .subscribe(
            data => {
              if (data.success) {
                showSuccessMessage(data.message);
                doctorHoliday.status = event;
              } else {
                showErrorMessage(data.message);
                doctorHoliday.status = !event;
              }
            },
            error => {
              doctorHoliday.status = event ? 0 : 1;
              showErrorMessage(ResultMessages.serverError);
            }
          );
      }
      
      // On Advance Search Submit
      onSubmit() {
        this.tableParams.start = 0;
        this.fetchAllDoctorHoliday();
      }
       //Sorting on Coloum With MatSort
       onSort(sort: Sort) {
        this.tableParams.sort = sort.active;
        this.tableParams.order = sort.direction;
        this.tableParams.start = 0;
        this.fetchAllDoctorHoliday();
      }
       //Reset Form Values on Advance Search
       resetTable() {
        this.form.reset();
        this.fetchAllDoctorHoliday();
      }
      onPaginate(pageEvent: PageEvent) {
        this.tableParams.limit = pageEvent.pageSize
        this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
        this.fetchAllDoctorHoliday()
      }
      fetchAllDoctorHoliday(){
        this.handleDateSelection('fromDate');
        this.handleDateSelection('toDate');
        this.loading = true;
        Object.assign(this.tableParams, this.form.value);
        this.doctorHolidayService.getAllByProcDoctorHolidays(this.tableParams).subscribe({
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
            showErrorMessage('Failed to load Doctor Holiday List data.');
          },
        });
      }
      
    
      AddEdit(Id?: any)
       {
        const dialogref = this.dialog.open(AddEditDoctorHolidaysComponent, {
          disableClose: true,
          autoFocus: false,
          width: '60%',
          maxHeight:'90vh',
          data: {
            doctorHolidayId: Id,
          },
        })
        dialogref.afterClosed().subscribe({
          next: (value) => {
            if (value) {
              this.fetchAllDoctorHoliday();
            }
          },
        });
       }
    
      handleDateSelection(fieldName: 'fromDate' | 'toDate') {
        const control = this.form.get(fieldName);
        if (!control) return;
      
        const value = control.value;
      
        if (!value) {
          this.form.patchValue({ [fieldName]: null });
          return;
        }
      
        const selectedDate = new Date(value);
        if (isNaN(selectedDate.getTime())) {
          this.form.patchValue({ [fieldName]: null });
          return;
        }
      
        const maxDate = new Date(this.maxDate);
        
        // Restrict date to not exceed maxDate
        if (selectedDate > maxDate) {
          this.form.patchValue({ [fieldName]: this.maxDate });
          return;
        }
      
        selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
        const iso = selectedDate.toISOString();
      
        this.form.patchValue({ [fieldName]: iso });
      }
      // Function to open the popup
      openDayPopup(dayNames: string[]): void {
        this.dialog.open(DayNamePopupComponent, {
          width: '300px',
          data: { days: dayNames }
        });
      }
}
