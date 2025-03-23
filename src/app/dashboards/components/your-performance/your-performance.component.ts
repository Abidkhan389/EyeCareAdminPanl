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
import { WelcomeService } from '../../services/welcom/welcome.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';

export interface yourperformanceChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

interface performanceLists {
  id: number;
  color: string;
  icon: string;
  title: string;
  subtext: string;
}

@Component({
  selector: 'app-your-performance',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule],
  templateUrl: './your-performance.component.html',
  styleUrl: './your-performance.component.scss'
})
export class AppYourPerformanceComponent {
  performanceLists: performanceLists[] = [];
  loginuserName: any;
  loginuserId: any;
  loginuserRole: any;
  currentYear: any;
  PreviousDayPatientChecked: any;
  PreviousDayPatientUnChecked: any;
  performanceData: any;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public yourperformanceChart!: Partial<yourperformanceChart> | any;

  constructor(private welcomeService: WelcomeService) {
    this.currentYear = new Date().getFullYear();
    this.currentYear = new Date().getFullYear();
    this.loginuserName = localStorage.getItem('FullName');
    this.loginuserId = localStorage.getItem('id');
    this.loginuserRole = localStorage.getItem('roles');
    let model = Object.assign({});
    model.logInUserId = this.loginuserId;
    model.logInUserRole = this.loginuserRole;
    this.getPerformanceDashboard(model);
  }
  getPerformanceDashboard(model: any) {
    this.welcomeService.PreviousDayPatientsRecord(model).pipe(
      finalize(() => {
        // this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
      })
    )
      .subscribe(
        (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
          if (result) {
            this.performanceData = result.data;
            this.loadChart(this.performanceData);
          }
        },
        (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
          showErrorMessage(ResultMessages.serverError);
        });
  }

  loadChart(performanceData: any) {
    this.yourperformanceChart = {
      series: [20, 20, 20, 20, 20],
      labels: ['245', '45', '14', '78', '95'],
      chart: {
        type: 'donut',
        height: 205,
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
          donut: {
            size: '90%',
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
        name: {
          show: false,
        },
      },
      stroke: {
        width: 2,
        colors: 'var(--mdc-elevated-card-container-color)',
      },
      tooltip: {
        fillSeriesColor: false,
      },
      colors: ['rgba(255, 102, 146, 1)', '#f8c20a', '#fff9e5', '#a6f7f5', '#16cdc7'],
      responsive: [
        {
          breakpoint: 1400,
          options: {
            chart: {
              height: 150,
            },
          },
        },
      ],
    };
    this.performanceLists = [
      {
        id: 1,
        color: 'primary',
        icon: 'solar:shop-2-linear',
        title: performanceData.previousDayPatientChecked.toString(),
        subtext: 'Checked',
      },
      {
        id: 2,
        color: 'error',
        icon: 'solar:filters-outline',
        title: performanceData.previousDayPatientUnChecked.toString(),
        subtext: 'unChecked',
      },
      {
        id: 3,
        color: 'accent',
        icon: 'solar:pills-3-linear',
        title: performanceData.previousDayPatientTotal.toString(),
        subtext: 'Total',
      },
    ];
  }
}
