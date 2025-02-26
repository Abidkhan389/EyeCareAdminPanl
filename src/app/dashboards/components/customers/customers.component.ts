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
import {StudentService} from '../../services/studens/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
export interface customerChart {
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
  selector: 'app-customers',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule,TranslateModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class AppCustomersComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  studentData:any;
  isLoading:boolean=true;
  public customerChart!: Partial<customerChart> | any;
  constructor(private studentService : StudentService,private message: MatSnackBar,) {
    this.customerChart = {
      series: [
        {
          name: '',
          color: '#16cdc7',
          data: [36, 45, 31, 47, 38, 43],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 70,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#16cdc7'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };
    this.loadStudentData();
  }
  loadStudentData() {
    this.studentService.studentDashboardData().subscribe({
      next: (data) => {
        this.studentData=data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load Student Dashboard data.');
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
