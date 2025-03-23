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
import { finalize } from 'rxjs';
import { showErrorMessage } from 'src/app/_common/messages';
import { ResultMessages } from 'src/app/_common/constant';

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
  selector: 'app-revenue-forecast',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule],
  templateUrl: './app-revenue-forecast.component.html',
})
export class AppRevenueForecastComponent {
  loginuserName:any;
  loginuserId:any;
  loginuserRole:any;
  revenueData:any;
  currentYear:any;
  previousYear:any;
  twoYearAgo:any;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenueForecastChart!: Partial<revenueForecastChart> | any;

  constructor(private welcomeService:WelcomeService) {
    this.currentYear= new Date().getFullYear();
    this.previousYear= this.currentYear - 1;
    this.twoYearAgo= this.currentYear - 2;
    this.currentYear= new Date().getFullYear();
    this.loginuserName = localStorage.getItem('FullName');
    this.loginuserId = localStorage.getItem('id');
    this.loginuserRole = localStorage.getItem('roles');
    let model = Object.assign({});
    model.logInUserId = this.loginuserId;
    model.logInUserRole = this.loginuserRole;
    this.getRevenueForCastDashboard(model);
  }
  getRevenueForCastDashboard(model:any){
    this.welcomeService.AllPatientRevenueyearlyWise(model).pipe(
          finalize(() => {           
           // this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
          })
        )
        .subscribe(
          (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
            if (result) {
              this.revenueData=result.data;
              this.loadChart();
            }
          },
          (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
            showErrorMessage(ResultMessages.serverError);
          });
  }
  loadChart(){
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
    colors: ['rgb(255, 102, 146)', '#16cdc7', 'rgb(99, 91, 255)'],
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
      strokeColor: ['rgba(255, 102, 146, 1)', '#16cdc7', 'rgba(99, 91, 255, 1)'],
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
