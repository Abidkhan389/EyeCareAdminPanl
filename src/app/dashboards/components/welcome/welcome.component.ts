import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { WelcomeService } from '../../services/welcom/welcome.service';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MaterialModule,TranslateModule,CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class AppWelcomeComponent {
  loginUserName: string;
  isLoading:boolean=true;
  welcomeData:any;
  constructor(private welcomeService : WelcomeService , private message: MatSnackBar) {
    this.loginUserName = 
  (localStorage.getItem('firstName') ?? '') + 
  ' ' + 
  (localStorage.getItem('lastName') ?? '');
    this.getWelcomeDashboard();
  }
  getWelcomeDashboard() {
      this.welcomeService.WelcomeDashboardIncomeData().subscribe({
        next: (employeeData) => {
          this.welcomeData=employeeData.data;
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

}
