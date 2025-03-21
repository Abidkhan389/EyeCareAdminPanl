import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { WelcomeService } from '../../services/welcom/welcome.service';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { showErrorMessage } from 'src/app/_common/messages';
import { ResultMessages } from 'src/app/_common/constant';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MaterialModule,TranslateModule,CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class AppWelcomeComponent implements OnInit{
  loginuserName:any;
  loginuserId:any;
  loginuserRole:any;
  currentMonthCount:any;
  CurrentWeekCount:any;
  constructor(private welcomeService:WelcomeService ) {}
ngOnInit(): void {
  this.loginuserName = localStorage.getItem('FullName');
  this.loginuserId = localStorage.getItem('id');
  this.loginuserRole = localStorage.getItem('roles');
  let model = Object.assign({});
  model.logInUserId = this.loginuserId;
  model.logInUserRole = this.loginuserRole;
  
    this.welcomeService.getCurrentWeekAndMonthCount(model).pipe(
      finalize(() => {
       // this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
      })
    )
    .subscribe(
      (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
        if (result) {
         this.currentMonthCount = result.data.currentMonthPatientCount;
         this.CurrentWeekCount = result.data.currentWeekPatientCount;
        }
      },
      (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
        showErrorMessage(ResultMessages.serverError);
      });
}
}
