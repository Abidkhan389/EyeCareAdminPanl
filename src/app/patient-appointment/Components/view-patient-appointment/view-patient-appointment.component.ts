import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-view-patient-appointment',
  standalone: true,
 imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './view-patient-appointment.component.html',
  styleUrl: './view-patient-appointment.component.scss'
})
export class ViewPatientAppointmentComponent {

}
