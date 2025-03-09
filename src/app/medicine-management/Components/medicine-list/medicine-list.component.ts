import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { MedicinesService } from '../../Services/medicines.service';
import { AddEditMedicineComponent } from './add-edit-medicine/add-edit-medicine.component';
import { MedicineDoctorManagementComponent } from './medicine-doctor-management/medicine-doctor-management.component';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './medicine-list.component.html',
  styleUrl: './medicine-list.component.scss'
})
export class MedicineListComponent {
  form: FormGroup;
  loading:boolean= true;
  medineList:any;
  medine: any[] = [];
  modalOptions: NgbModalOptions = {};
  selectedRows = new SelectionModel<any>(true, []);
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['sn.', 'status','doctorName','medicineName','medicineTypeName','medicineTypePotencyName','expiryDate','actions'];
  medicineName:any;
  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  CurrentMedicineTypeId: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  MedicineList:any;
  validationMessages = Messages.validation_messages;

  constructor(private medicinesService:MedicinesService, private dilog: MatDialog, private fb: FormBuilder,private modalService: NgbModal,
      protected router: Router,private route: ActivatedRoute,private message: MatSnackBar,private confirmationService: ConfirmationService){
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllMedicines();
  }
  validateForm(){
    this.form= this.fb.group({
      medicineName: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
    })
  }
  updateStatus(event: any, medicine: any) {
    this.loading = true;
    
    let model = {
      id: medicine.id,
      status: event ? 1 : 0
    };
  
    this.medicinesService.updateMedicinesStatus(model)
      .pipe(
        finalize(() => {
          this.loading = false;  // Ensure loading false after API completes
        })
      )
      .subscribe(
        data => {
          if (data.success) {
            showSuccessMessage(data.message);
            medicine.status = event;
          } else {
            showErrorMessage(data.message);
            medicine.status = !event;
          }
        },
        error => {
          medicine.status = event ? 0 : 1;
          showErrorMessage(ResultMessages.serverError);
        }
      );
  }
  
  // On Advance Search Submit
  onSubmit() {
    this.tableParams.start = 0;
    this.fetchAllMedicines();
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllMedicines();
  }
   //Reset Form Values on Advance Search
   resetTable() {
    this.form.reset();
    this.fetchAllMedicines();
  }
  onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllMedicines()
  }
  fetchAllMedicines(){
    this.loading = true;
    Object.assign(this.tableParams, this.form.value);
    this.medicinesService.getAllMedicines(this.tableParams).subscribe({
      next: (response) => {
        debugger
        this.count = response.data.totalCount;
        this.dataSource = response.data.dataList;
        this.MedicineList = response.data.dataList;
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
        this.showErrorMessage('Failed to load medicine type List data.');
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
    const dialogref = this.dilog.open(AddEditMedicineComponent, {
      disableClose: true,
      autoFocus: false,
      width: '60%',
      data: {
        MedicineId: Id,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value: any) => {
        if (value) {
          this.fetchAllMedicines();
        }
      },
    });
   }

  ViewMedicines(id: any): void {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }
  formatDate(date: string | null): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Outputs YYYY-MM-DD
  }
  isExpiringSoon(date: string | null): boolean {
    if (!date) return false;
  
    const expiryDate = new Date(date);
    const currentDate = new Date();
  
    // Reset time to 00:00:00 for accurate day comparison
    expiryDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    // Calculate the difference in days
    const timeDifference = expiryDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    // Mark red if expiry is today, in the past, or within 5 days
    return differenceInDays <= 1;
  }
  ManageMedicineDoctor(medicineId: number)
  {
    if (!this.MedicineList || this.MedicineList.length === 0) {
      console.error('MedicineList is empty or not loaded');
      return;
    }
  
    const medicine = this.MedicineList.find((x: any) => x.id === medicineId);
    const medicineName = medicine ? medicine.medicineName : 'Not Found';

    const dialogref = this.dilog.open(MedicineDoctorManagementComponent, {
      disableClose: true,
      autoFocus: false,
      width: '60%',
      data: {
        MedicineId: medicineId,
        MedicineName : medicineName,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value: any) => {
        if (value) {
          this.fetchAllMedicines();
        }
      },
    });
   }
 
}
