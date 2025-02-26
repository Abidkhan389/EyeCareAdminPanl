import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import {EmployeesService} from '../../services/Employees/employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
export interface projectsChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule,TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class AppProjectsComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  employeeData:any;
  isLoading:boolean=true;
  public projectsChart!: Partial<projectsChart> | any;

  constructor(private employeesService: EmployeesService,private message: MatSnackBar,) {
    this.projectsChart = {
      series: [
        {
          name: '',
          labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
          color: '#ffffff',
          data: [3, 5, 5, 7, 6, 5, 3, 5, 3],
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 46,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      colors: ['#ffffff'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'flat',
          borderRadius: 4,
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
    this.loadEmployees();
  }
  loadEmployees(){
    this.employeesService.employeesDashboardData().subscribe({
      next: (data) => {
        this.employeeData=data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load Employee Dashboard data.');
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
}
