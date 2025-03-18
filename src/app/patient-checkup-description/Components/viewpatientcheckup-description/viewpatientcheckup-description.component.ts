import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { PatientAppointmentService } from 'src/app/patient-appointment/Services/patient-appointment.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientCheckUpDescriptionService } from '../../Services/patient-check-up-description.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';

@Component({
  selector: 'app-viewpatientcheckup-description',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './viewpatientcheckup-description.component.html',
  styleUrl: './viewpatientcheckup-description.component.scss'
})
export class ViewpatientcheckupDescriptionComponent {
loading:boolean= true;
  patientAppointmentCheckUpDescription:any
  
constructor(
    private route: ActivatedRoute,
    private patientCheckUpDescriptionService: PatientCheckUpDescriptionService,
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Get employee ID from the route
      this.GetPatiencheckupDescription(id);
    });
  }
  GetPatiencheckupDescription(id: any) {
     this.loading = true;
     let model = Object.assign({});
     model.id = id
     this.patientCheckUpDescriptionService.GetPatientDescriptionByIdForShowHistroy(model).pipe(
       finalize(() => {
         this.loading = false;
       }))
       .subscribe(result => {
         if (result) {
          this.patientAppointmentCheckUpDescription= result.data; 
         }
       },
         error => {
           showErrorMessage(ResultMessages.serverError);
         });
 
   }

}
