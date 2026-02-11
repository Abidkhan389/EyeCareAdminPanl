import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Helpers } from 'src/app/_common/_helper/app_helper';
import { excelGeneratorService } from 'src/app/_common/_helper/excelGeneratorService';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientCheckUpHistryReportsService } from 'src/services/Reports/patient-check-up-histry-reports.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-patient-reports-by-doctor',
  standalone: true,
  imports: [MaterialModule, CommonModule, SharedModule],
  templateUrl: './patient-reports-by-doctor.component.html',
  styleUrls: ['./patient-reports-by-doctor.component.scss']
})
export class PatientReportsByDoctorComponent implements OnInit {
  reportForm!: FormGroup;
  loading: any;
  maxDate: Date = new Date();
  minDate!: Date;

  constructor(private patientCheckUpHistryReportsService: PatientCheckUpHistryReportsService, private fb: FormBuilder, private dialogref: MatDialogRef<PatientReportsByDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private authService:AuthService) { }
  ngOnInit(): void {
    this.minDate = this.getDateYearsBack(3);
    this.validateform();
  }
  validateform() {
    this.reportForm = this.fb.group({
      fromDate: [],
      toDate: []
    });
  }
  GetCheckedPatientHistoryByDoctorReport() {
    this.loading = true;
    const raw = this.reportForm.getRawValue();
    const model= {
      ...raw,
      fromDate: Helpers.formatDate(raw.fromDate),
      toDate: Helpers.formatDate(raw.toDate)
    }

    this.patientCheckUpHistryReportsService
      .GetCheckedPatientHistoryByDoctorReport(model)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res: any) => {
          if (res.success) {
           // Logged in user name (example)
        const userName =   localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');

        const fileName =
          `PatientReport_${userName}_${Helpers.formatDate(new Date())}`;

        excelGeneratorService.exportDoctorPatientReport(res.data, fileName);

        showSuccessMessage('Excel downloaded successfully');
         this.dialogref.close(true);
          } else {
            showErrorMessage(res.message);
          }
        },
        error: (err) => {
          console.error(err);
          showErrorMessage(this.data.message);
        }
      });
  }
  
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
  private getDateYearsBack(years: number): Date {
    const date = new Date();
    date.setFullYear(date.getFullYear() - years);
    return date;
  }
}
