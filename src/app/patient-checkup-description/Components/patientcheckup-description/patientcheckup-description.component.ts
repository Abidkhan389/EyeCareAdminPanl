import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-patientcheckup-description',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './patientcheckup-description.component.html',
  styleUrl: './patientcheckup-description.component.scss'
})
export class PatientcheckupDescriptionComponent {

}
