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
import { WelcomeService } from '../../services/welcom/welcome.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';
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
  loginuserName:any;
  loginuserId:any;
  loginuserRole:any;
  TotalPatient:any;
  TotalPatientFeeSum:any;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public projectsChart!: Partial<projectsChart> | any;

  constructor(private welcomeService:WelcomeService) {
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
