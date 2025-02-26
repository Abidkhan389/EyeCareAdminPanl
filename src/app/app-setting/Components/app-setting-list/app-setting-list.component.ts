import { Component } from '@angular/core';
import { AppSettingService } from '../../Service/app-setting.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '../../../shared/services/confirmation.service';
import { RepoResponse } from '../../../apiTypes/RepoResponse';

@Component({
  selector: 'app-app-setting-list',
  templateUrl: './app-setting-list.component.html',
  styleUrl: './app-setting-list.component.scss'
})
export class AppSettingListComponent {
  
  selectedRows = new SelectionModel<any>(true, []);
  appSettingList!: MatTableDataSource<any>;
  isVisible: boolean = false;
  isLoading = true;
  constructor(private readonly router: Router, private route: ActivatedRoute,
    private appSettingService:AppSettingService,) { }
  columns: string[] = [
    'appSettingName',
    'appSettingValue',
    'actions',
  ];
  ngOnInit(): void {
    this.getAllappSettings();
  }
  getAllappSettings() {
    this.appSettingService.getAppSetting().subscribe({
      next: (response: RepoResponse<any[]>) => {
        if (response.success) {
          response.data.forEach(item => {
            if (item.hiddenDescription === "GradeReportFrequency") {
              item.appSettingValue = item.appSettingValue + ' Month';
            }
          });
          this.appSettingList = new MatTableDataSource(response.data);
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  editAppSetting(id: number): void {
    
    this.router.navigate([`edit/${id}`], { relativeTo: this.route });
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.appSettingList.data);
  }
  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.appSettingList.data.length;
    return numSelected === numRows;
  }
  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.appSettingList.filter = filterValue;

    if (this.appSettingList.paginator) {
      this.appSettingList.paginator.firstPage();
    }
  }

}
