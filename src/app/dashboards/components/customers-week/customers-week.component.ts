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
  NgApexchartsModule,
} from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeService } from '../../services/welcom/welcome.service';
import { finalize } from 'rxjs';
import { showErrorMessage } from 'src/app/_common/messages';
import { ResultMessages } from 'src/app/_common/constant';

export interface customersweekChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

@Component({
  selector: 'app-customers-week',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, TablerIconsModule,TranslateModule],
  templateUrl: './customers-week.component.html',
  styleUrl: './customers-week.component.scss'
})
export class AppCustomersWeekComponent {
  currentWeekRange: string = '';
  loginuserName:any;
  loginuserId:any;
  loginuserRole:any;
  currentWeekData:any;
  lastWeekData:any;
  
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public customersweekChart!: Partial<customersweekChart> | any;

  constructor(private welcomeService:WelcomeService) {
  this.loginuserName = localStorage.getItem('FullName');
  this.loginuserId = localStorage.getItem('id');
  this.loginuserRole = localStorage.getItem('roles');
  let model = Object.assign({});
  model.logInUserId = this.loginuserId;
  model.logInUserRole = this.loginuserRole;
  this.getRevenueForCastDashboard(model);
    this.setCurrentWeekRange();
    this.customersweekChart = {
      series: [
        {
          name: 'April 07 ',
          data: [0, 20, 15, 19, 14, 25, 30],
        },
        {
          name: 'Last Week',
          data: [0, 8, 19, 13, 26, 16, 25],
        },
      ],

      chart: {
        type: 'area',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
        height: 100,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      colors: ['rgb(99, 91, 255)', '#dddbff'],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          inverseColors: false,
          opacityFrom: 0.05,
          opacityTo: 0,
          stops: [20, 180],
        },
      },
      markers: {
        size: 0,
      },
      tooltip: {
        enabled: false,
      },
    };
  
  }
  setCurrentWeekRange() {
    const today = new Date();
  
    // Get the current week's Monday (start of the week)
    const firstDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - ((today.getUTCDay() + 6) % 7)));
  
    // Get the current week's Sunday (end of the week)
    const lastDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), firstDay.getUTCDate() + 6));
  
    // Format function to get "Month DD"
    const formatDate = (date: Date) =>
      date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', timeZone: 'UTC' });
  
    this.currentWeekRange = `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
  }
  
  getRevenueForCastDashboard(model:any){
      this.welcomeService.LastTwoWeekWeekPatientCount(model).pipe(
            finalize(() => {           
             // this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
            })
          )
          .subscribe(
            (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
              if (result) {
                this.currentWeekData=result.data.lastWeekPatientCount;
                this.lastWeekData=result.data.secondLastWeekPatientCount;
              }
            },
            (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
              showErrorMessage(ResultMessages.serverError);
            });
    }
}
