import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { PayIn } from '../../../apiTypes/ApiTypes';
import { FinancialOperationsService } from '../../services/financial-operations.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import { Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal.service';
import { ConfirmDeleteResponseType } from '../../../shared/models/confirmDeleteResponseType';
import { AlertService } from '../../../shared/services/alert.service';
import { ALERT_TYPE } from '../../../shared/models/alert';

@Component({
  selector: 'app-pay-ins',
  templateUrl: './pay-ins.component.html',
  styleUrl: './pay-ins.component.scss',
})
export class PayInsComponent implements OnInit {
  dataSource = new MatTableDataSource<PayIn>([]);
  selection = new SelectionModel<PayIn>(true, []);
  columns: string[] = [
    'select',
    'amount',
    'description',
    'currencyCode',
    'vendorId',
    'paidOn',
    'actions',
  ];
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private financialOpsService: FinancialOperationsService,
    private router: Router,
    private modalService: ModalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getPayIns();
  }

  // Fetch PayIns from the service
  getPayIns(): void {
    this.loading = true;
    this.financialOpsService.getPayIns().subscribe({
      next: (response: RepoResponse<PayIn[]>) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading PayIns', err);
        this.loading = false;
      },
    });
  }

  // Filter the table data
  filterData(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Toggle row selection
  toggleAllRows(): void {
    this.selection.hasValue()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Additional methods to handle actions
  deleteSelectedPayIns(): void {
    const selectedIds = this.selection.selected.map((payIn) => payIn.payInId);
    //------------------- Implement the logic here for multiple delete-------- ////////

   // if (selectedIds.length > 0) this.deletePayIn(selectedIds);
    //this.selection.clear(); // Clear the selection
    //-----------------------//
  }

  editPayIn(payInId: number): void {
    this.router.navigate([`billing/payins/edit/${payInId}`]);
  }

  deletePayIn(payInId: any): void {
    this.modalService
      .confirmDelete()
      .subscribe((x: ConfirmDeleteResponseType) => {
        if (x === ConfirmDeleteResponseType.CONFIRMED) {
          this.financialOpsService.deletePayIn(payInId).subscribe({
            next: (response: RepoResponse<boolean>) => {
              if (response.success) {
                this.alertService.alert(
                  'Pay-In was delete successfully!',
                  ALERT_TYPE.SUCCESS
                );
                this.getPayIns();
              } else {
                this.alertService.alert(
                  'Pay-In was not deleted. Something went wrong!',
                  ALERT_TYPE.ERROR
                );
                this;
              }
            },
            error: (err) => {
              this.alertService.alert(
                'Pay-In was not deleted. Something went wrong!',
                ALERT_TYPE.ERROR
              );
            },
          });
        }
      });
  }

  createPayIn() {
    this.router.navigate(['billing/payins/create']);
  }
}
