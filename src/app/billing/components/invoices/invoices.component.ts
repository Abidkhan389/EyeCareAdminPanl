import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { FinancialOperationsService } from '../../services/financial-operations.service';
import { Invoice, InvoiceStatus } from '../../../apiTypes/ApiTypes';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal.service';
import { ConfirmDeleteResponseType } from '../../../shared/models/confirmDeleteResponseType';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';
import { AuthService } from '../../../auth/services/auth.service';
import { AttendanceStatus } from '../../../apiTypes/studentAttendance';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent implements OnInit {
  dataSource = new MatTableDataSource<Invoice>();
  selectedRows = new SelectionModel<Invoice>(true, []);
  columns: string[] = [
    'select',
    'invoiceNumber',
    'vendorName',
    'vendorId',
    'amount',
    'dueDate',
    'actions',
    'status',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading: boolean = true;
  isAdminOrSuperAdmin = false; // Boolean to determine if the user is an Admin/Super Admin
  currentUser!: any;
  constructor(
    private invoiceService: FinancialOperationsService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchInvoices();
    this.checkUserRole();
  }
  checkUserRole() {
    // Logic to set `isAdminOrSuperAdmin` based on the user role
    this.currentUser = this.authService.getCurrentUser();
    const roles = this.currentUser.roles;
    if (roles.includes('ADMIN') || roles.includes('SUPERADMIN')) {
        this.isAdminOrSuperAdmin = true;
    }
  }

  isDue(date: string) {
    return new Date(date) < new Date();
  }
  fetchInvoices() {
    this.invoiceService.getInvoices().subscribe((result) => {
      if (result.data) {
        this.dataSource.data = result.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }
    });
  }
  viewInvoice(invoiceId: number) {
    this.router.navigate([`/billing/invoice/view/${invoiceId}`]);
  }

  // Filtering
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Select/Deselect All Rows
  toggleAllRows() {
    if (this.selectedRows.selected.length === this.dataSource.data.length) {
      this.selectedRows.clear();
    } else {
      this.selectedRows.select(...this.dataSource.data);
    }
  }

  // Check if all rows are selected
  isAllSelected() {
    return this.selectedRows.selected.length === this.dataSource.data.length;
  }

  // Add New Invoice
  createInvoice() {
    this.router.navigate([`invoices/create`], { relativeTo: this.route });
  }

  // Edit Invoice
  editInvoice(id: number) {
    this.router.navigate([`/billing/invoices/edit/${id}`]);
  }

  // Delete Single Invoice
  deleteInvoice(id: number) {
    if(this.isAdminOrSuperAdmin)
      {
    this.modalService.confirmDelete().subscribe((response) => {
      if (response === ConfirmDeleteResponseType.CONFIRMED) {
        this.invoiceService.deleteInvoice(id).subscribe({
          next: (data: RepoResponse<boolean>) => {
            if (data.success) {
              this.alertService.alert(
                'Invoice was deleted successfully!',
                ALERT_TYPE.SUCCESS
              );
              this.fetchInvoices();
            } else {
              this.alertService.alert(
                'Something went wrong!',
                ALERT_TYPE.ERROR
              );
            }
          },
        });
      }
    });
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not authorized to Delete it !",
      // footer: '<a href="#">Why do I have this issue?</a>'
    });
  }
  }

  // Delete Selected Invoices
  deleteSelectedInvoices() {
    const selectedIds = this.selectedRows.selected.map(
      (row) => row.vendorInvoiceId
    );
    // Logic to delete all selected invoices
  }
  InvoiceStatusOptions = [
    { value: InvoiceStatus.PAID, label: 'Paid' },
    { value: InvoiceStatus.PENDING, label: 'Pending' },
    { value: InvoiceStatus.REFUNDED, label: 'Refunded' },
    { value: InvoiceStatus.ADJUSTED, label: 'Adjusted' },
    { value: InvoiceStatus.DISPUTED, label: 'Disputed' },
  ];
  getInvoiceLabel(invoiceStatus: any): string {
    if (!invoiceStatus) {
      return (
        this.InvoiceStatusOptions.find((x) => x.value === InvoiceStatus.PENDING)
          ?.label ?? ''
      );
    }
    return this.InvoiceStatusOptions.find((x) => x.value == invoiceStatus)!
      .label;
  }
}
