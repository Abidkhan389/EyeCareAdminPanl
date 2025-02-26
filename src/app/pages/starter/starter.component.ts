import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppWelcomeComponent } from 'src/app/dashboards/components/welcome/welcome.component';
import { AppCustomersComponent } from 'src/app/dashboards/components/customers/customers.component';
import { AppProjectsComponent } from 'src/app/dashboards/components/projects/projects.component';
import { AppRevenueForecastComponent } from 'src/app/dashboards/components/app-revenue-forecast/app-revenue-forecast.component';
import { AppTopCardsComponentComponent } from 'src/app/dashboards/components/top-cards-component/top-cards-component.component';
import { AppYourPerformanceComponent } from 'src/app/dashboards/components/your-performance/your-performance.component';
import { AppCustomersWeekComponent } from 'src/app/dashboards/components/customers-week/customers-week.component';
import { AppSalesOverviewComponent } from 'src/app/dashboards/components/sales-overview/sales-overview.component';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports:
  [MaterialModule,
  AppWelcomeComponent,
  AppCustomersComponent,
  AppProjectsComponent,
  AppRevenueForecastComponent,
  AppTopCardsComponentComponent,
  AppYourPerformanceComponent,
  AppCustomersWeekComponent,
  AppSalesOverviewComponent
],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {}
