import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/_common/_services/api.service';
import { APIPaths } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';

@Injectable({
  providedIn: 'root'
})
export class PatientCheckUpHistryReportsService extends ApiService {

  constructor(private http: HttpClient) {
    super(http);
  }
  GetCheckedPatientHistoryByDoctorReport(model: any) {
    return this.service(
      this.post(APIPaths.GetCheckedPatientHistoryByDoctorReport, model)
    ).pipe(
      map(value => this.processPayload(value))
    );
  }

}
