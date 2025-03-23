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
import { WelcomeService } from '../../services/welcom/welcome.service';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';
import { finalize } from 'rxjs';
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
  loginuserName:any;
  loginuserId:any;
  loginuserRole:any;
  TotalPatient:any;
  TotalPatientFeeSum:any;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public customerChart!: Partial<customerChart> | any;

  constructor(private welcomeService:WelcomeService) {
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
  }
  ngOnInit(): void {
    this.loginuserName = localStorage.getItem('FullName');
    this.loginuserId = localStorage.getItem('id');
    this.loginuserRole = localStorage.getItem('roles');
    let model = Object.assign({});
    model.logInUserId = this.loginuserId;
    model.logInUserRole = this.loginuserRole;
    
      this.welcomeService.AllPatientWithFeeCount(model).pipe(
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
