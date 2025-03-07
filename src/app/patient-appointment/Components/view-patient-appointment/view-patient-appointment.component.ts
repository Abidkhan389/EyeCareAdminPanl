import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientAppointmentService } from '../../Services/patient-appointment.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';

@Component({
  selector: 'app-view-patient-appointment',
  standalone: true,
 imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './view-patient-appointment.component.html',
  styleUrl: './view-patient-appointment.component.scss'
})
export class ViewPatientAppointmentComponent {
loading:boolean= true;
  patientAppointment:any
  
constructor(
    private route: ActivatedRoute,
    private patientAppointmentService:PatientAppointmentService,
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Get employee ID from the route
      this.GetMedicineType(id);
    });
  }

  GetMedicineType(id:any) {
     this.loading = true;
     let model = Object.assign({});
     model.id = id;
   
     this.patientAppointmentService.getPatientAppointmentById(model).pipe(
       finalize(() => {
         this.loading = false; // ✅ Ensures `loading` is reset when the API call completes
       })
     )
     .subscribe(
       (result: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
         if (result) {
          this.patientAppointment=result.data;
         }
       },
       (error: any) => { // ✅ Explicitly define type as 'any' to avoid TS7006
         showErrorMessage(ResultMessages.serverError);
       }
     );
   }
}
