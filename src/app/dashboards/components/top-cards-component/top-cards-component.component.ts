import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeService } from '../../services/welcom/welcome.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface topcards {
  id: number;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-top-cards-component',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule,TranslateModule],
  templateUrl: './top-cards-component.component.html',
  styleUrl: './top-cards-component.component.scss'
})
export class AppTopCardsComponentComponent {
  topcards: topcards[];
  topCardData:any;
  isLoading:boolean=true;

  constructor(private welcomeService : WelcomeService,private message: MatSnackBar){
    this.gettpcardsDashboard();
  }
 

  gettpcardsDashboard() {
    this.welcomeService.WelcomeTopCardService().subscribe({
      next: (RevenueForCastData) => {
        this.topCardData=RevenueForCastData.data;
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
    this.topcards= [
      {
        id: 1,
        color: 'primary',
        icon: 'solar:dollar-minimalistic-linear',
        title: 'Late Student Payments',
        subtitle: this.topCardData.lateStudentPayment,
      },
      {
        id: 2,
        color: 'warning',
        icon: 'solar:recive-twice-square-linear',
        title: 'Outstanding invoices',
        subtitle: this.topCardData.outStandingInvoice,
      },
      {
        id: 3,
        color: 'accent',
        icon: 'ic:outline-backpack',
        title: 'Total Payins',
        subtitle: this.topCardData.totalPayIns,
      },
      {
        id: 4,
        color: 'error',
        icon: 'ic:baseline-sync-problem',
        title: 'Total Student Payments',
        subtitle: this.topCardData.totalStudentPayments,
      },
      {
        id: 5,
        color: 'success',
        icon: 'ic:outline-forest',
        title: 'Total Unpaid Employees',
        subtitle: this.topCardData.totalUnPaidEmployees,
      },
    ];
  }
}
