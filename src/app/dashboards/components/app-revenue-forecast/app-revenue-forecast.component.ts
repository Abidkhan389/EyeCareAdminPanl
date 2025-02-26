import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexFill,
} from 'ng-apexcharts';
import { WelcomeService } from '../../services/welcom/welcome.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

export interface revenueForecastChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
}

@Component({
  selector: 'app-app-revenue-forecast',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule,TranslateModule],
  templateUrl: './app-revenue-forecast.component.html',
  styleUrl: './app-revenue-forecast.component.scss'
})
export class AppRevenueForecastComponent {
  isLoading:boolean=true;
  revenueData:any;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenueForecastChart!: Partial<revenueForecastChart> | any;

  constructor(private welcomeService : WelcomeService,private message: MatSnackBar) {      
    this.getRevenueForCastDashboard();
  }
  getRevenueForCastDashboard() {
    this.welcomeService.WelcomeRevenueForCast().subscribe({
      next: (RevenueForCastData) => {
        this.revenueData=RevenueForCastData.data;
        this.LoadChart();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.showErrorMessage('Failed to load Welcome Dashboard data.');
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
  LoadChart()
  {
    this.revenueForecastChart = {
      series: this.revenueData,

      chart: {
        type: 'area',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 300,
        width: '100%',
        stacked: false,
        offsetX: -10,
      },
      colors: ['rgb(255, 102, 146)', '#16cdc7', 'rgb(99, 91, 255)', '#f4b400'],
      stroke: {
        width: 2,
        curve: 'monotoneCubic',
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        padding: {
          top: 0,
          bottom: 0,
        },
        borderColor: 'rgba(0,0,0,0.05)',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0,
          stops: [20, 180],
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug','Sept','Oct','Nov','Dec'],
      },
      markers: {
        strokeColor: ['rgba(255, 102, 146, 1)', '#16cdc7', 'rgba(99, 91, 255, 1)', '#f4b400',],
        strokeWidth: 2,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    }; 
  }
}
