import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicinetypeService } from '../../Services/medicinetype.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/interfaces/ITable';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { MatSort, Sort } from '@angular/material/sort';
import { Messages } from 'src/app/shared/Validators/validation-messages';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'src/app/shared/services/confirmation.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showSuccessMessage, showErrorMessage } from 'src/app/_common/messages';
import { AddeditmecinetypeComponent } from '../addeditmecinetype/addeditmecinetype.component';

@Component({
  selector: 'app-medicine-type-list',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './medicine-type-list.component.html',
  styleUrl: './medicine-type-list.component.scss'
})
export class MedicineTypeListComponent implements OnInit{
  form: FormGroup;
  loading:boolean= true;
  medineTypeList:any;
  medineType: any[] = [];
  modalOptions: NgbModalOptions = {};
  selectedRows = new SelectionModel<any>(true, []);
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['sn.', 'status','typeName','MG','actions'];

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

  constructor(private medicineTypeService:MedicinetypeService, private dilog: MatDialog, private fb: FormBuilder,private modalService: NgbModal,
      protected router: Router,private route: ActivatedRoute,private message: MatSnackBar,private confirmationService: ConfirmationService){
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllMedicineType();
  }
  validateForm(){
    this.form= this.fb.group({
      typeName: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
    })
  }
  updateStatus(event: any, medicine: any) {
    this.loading = true;
    
    let model = {
      id: medicine.id,
      status: event ? 1 : 0
    };
  
    this.medicineTypeService.updateMedicineTypeStatus(model)
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
    this.fetchAllMedicineType();
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllMedicineType();
  }
   //Reset Form Values on Advance Search
   resetTable() {
    this.form.reset();
    this.fetchAllMedicineType();
  }
  onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllMedicineType()
  }
  fetchAllMedicineType(){
    this.loading = true;
    Object.assign(this.tableParams, this.form.value);
    this.medicineTypeService.getAllMedicineType(this.tableParams).subscribe({
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

  AddEdit(Id?: any)
   {
    const dialogref = this.dilog.open(AddeditmecinetypeComponent, {
      disableClose: true,
      autoFocus: false,
      width: '60%',
      data: {
        MedicineTypeId: Id,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllMedicineType();
        }
      },
    });
   }

  ViewMedicineType(id: any): void {
    this.router.navigate(['view', id], { relativeTo: this.route });
  }

}
