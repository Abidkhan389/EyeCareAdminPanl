import { Component, OnInit, ViewChild } from '@angular/core';
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
import { WelcomeService } from '../../services/welcom/welcome.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';

export interface salesoverviewChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

@Component({
  selector: 'app-sales-overview',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule],
  templateUrl: './sales-overview.component.html',
  styleUrl: './sales-overview.component.scss'
})
export class AppSalesOverviewComponent implements OnInit {
  loginuserName:any;
  loginuserId:any;
  loginuserRole:any;
  TotalPatient:any;
  TotalPatientFeeSum:any;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public salesoverviewChart!: Partial<salesoverviewChart> | any;

  constructor(private welcomeService:WelcomeService) {
    this.salesoverviewChart = {
      series: [50, 80, 30],

      chart: {
        type: 'radialBar',
        height: 230,
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
      },
      plotOptions: {
        radialBar: {
          inverseOrder: false,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 1,
            size: '40%',
          },
          dataLabels: {
            show: false,
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: { width: 1, lineCap: 'round' },
      tooltip: {
        enabled: false,
        fillSeriesColor: false,
      },
      colors: ['rgba(99, 91, 255, 1)', '#16cdc7', 'rgba(255, 102, 146, 1)'],
    };
  }
  ngOnInit(): void {
      this.loginuserName = localStorage.getItem('FullName');
      this.loginuserId = localStorage.getItem('id');
      this.loginuserRole = localStorage.getItem('roles');
      let model = Object.assign({});
      model.logInUserId = this.loginuserId;
      model.logInUserRole = this.loginuserRole;
      
        this.welcomeService.LastWeekPatientWithFeeSum(model).pipe(
          finalize(() => {
           // this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
          })
        )
        .subscribe(
          (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
            if (result) {
             this.TotalPatient = result.data.patientCount;
             this.TotalPatientFeeSum = result.data.patientFeeCount;
            }
          },
          (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
            showErrorMessage(ResultMessages.serverError);
          });
    }
}
