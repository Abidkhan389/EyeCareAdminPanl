import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FinancialOperationsService } from '../../services/financial-operations.service';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../apiTypes/student';
import { StudentAccount } from '../../../apiTypes/studentaccount';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentPayments } from '../../../apiTypes/ApiTypes';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalService } from '../../../shared/services/modal.service';
import { StudentPaymentViewComponent } from './student-payment-view/student-payment-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrl: './student-payments.component.scss',
})
export class StudentPaymentsComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly studentService: StudentService,
    private readonly financeService: FinancialOperationsService,
    private readonly fb: FormBuilder,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly modalService: ModalService,
    private dialog: MatDialog,
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  studentForm = this.fb.group({
    student: ['', Validators.required],
    account: ['', Validators.required],
    startDate: [''],
    endDate: [''],
  });

  isLoading = true;
  students!: Student[];
  account!: StudentAccount;
  selectedRows = new SelectionModel<StudentPayments>(true, []);
  studentPayments = new MatTableDataSource<StudentPayments>();
  columns: string[] = [
    'select',
    'studentPaymentId',
    'amount',
    'currency',
    'payeeName',
    'paymentDate',
    'receivedBy',
  ];
  ngAfterViewInit() {
    // this.studentPayments.paginator = this.paginator;
    // this.studentPayments.sort = this.sort;
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((x) => {
      if (!x.success) {
        this.alertService.alert(
          x.errors[0] ?? 'Something went wrong. Please try again later!',
          ALERT_TYPE.ERROR
        );
        return;
      }
      this.students = x.data;
      this.studentPayments.paginator = this.paginator;
      this.studentPayments.sort = this.sort;
      this.isLoading = false;
    });
  }

  loadAccounts(event: string) {
    var val = event;
    this.financeService.getStudentAccount(parseInt(val)).subscribe((x) => {
      if (!x.success) {
        this.alertService.alert(
          x.errors[0] ?? 'Something went wrong. Please try again later!',
          ALERT_TYPE.ERROR
        );
      }
      this.account = x.data;
    });
  }

  loadPayments(accountId: string) {
    this.financeService
      .getStudentPayments(parseInt(accountId))
      .subscribe((x) => {
        if (x) {
          if (!x.success) {
            this.alertService.alert(
              x.errors[0] ?? 'Something went wrong. Please try again later!',
              ALERT_TYPE.ERROR
            );
          }
          if (x.data) {
            this.studentPayments = new MatTableDataSource(x.data);
          }
        }
      });
  }

  private convertJSDateToCSharpDate(date: Date | string): string {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
    const isoDate = newDate.toISOString(); // This converts the date to ISO format
    return isoDate;
  }
  searchPayment(event: Event) {
    const { startDate, endDate, student } = this.studentForm.value;
    const startDateIso = this.convertJSDateToCSharpDate(startDate ?? '');
    const endDateIso = this.convertJSDateToCSharpDate(endDate ?? '');
    this.financeService
      .filterStudentPayments(parseInt(student ?? ''), startDateIso, endDateIso)
      .subscribe((x) => {
        if (x) {
          if (!x.success) {
            this.alertService.alert(
              x.errors[0] ?? 'Something went wrong. Please try again later!',
              ALERT_TYPE.ERROR
            );
          }
          if (x.data) {
            this.studentPayments = new MatTableDataSource(x.data);
          }
        }
      });
  }

  createNewPayment() {
    this.router.navigate([`studentPayment/create`], { relativeTo: this.route });
  }

  viewPayment(id: number) {
    // this.modalService.open(
    //   StudentPaymentViewComponent,
    //   this.studentPayments.data.find((x) => x.studentPaymentId === id)
    // );
    const payment = this.studentPayments.data.find((x) => x.studentPaymentId === id)
    
    const dialogref = this.dialog.open(StudentPaymentViewComponent, {
      disableClose: true,
      autoFocus: false,
      width: '80%',
      height: '50vh',
      data: payment,
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
         
        }
      },
    });
    
    
    // this.router.navigate([`studentPayment/view/${id}`], {
    //   relativeTo: this.route,
    // });
  }

  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentPayments.filter = filterValue.trim().toLowerCase();

    if (this.studentPayments.paginator) {
      this.studentPayments.paginator.firstPage();
    }
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.studentPayments.data);
  }

  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.studentPayments.data.length;
    return numSelected === numRows;
  }
}
