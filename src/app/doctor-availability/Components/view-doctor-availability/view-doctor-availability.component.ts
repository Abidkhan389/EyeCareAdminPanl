import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorAvailabilityService } from '../../Services/doctor-availability.service';
import { finalize } from 'rxjs';
import { ResultMessages } from 'src/app/_common/constant';
import { showErrorMessage } from 'src/app/_common/messages';

@Component({
  selector: 'app-view-doctor-availability',
  standalone: true,
  imports: [MaterialModule,CommonModule,SharedModule],
  templateUrl: './view-doctor-availability.component.html',
  styleUrl: './view-doctor-availability.component.scss'
})
export class ViewDoctorAvailabilityComponent {
  loading:boolean= true;
  doctorAvailability:any
constructor(
    private route: ActivatedRoute,
    private doctorAvailabilityService:DoctorAvailabilityService,
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Get employee ID from the route
      this.getByIdDoctorAvaibality(id);
    });
  }
  getByIdDoctorAvaibality(id: any) {
    this.loading = true;
    let model = Object.assign({});
    model.id = id;
  
    this.doctorAvailabilityService.getByIdDoctorAvaibality(model).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(
      (result: any) => {
        if (result && result.data) {
          // Convert time format in DoctorTimeSlots
          result.data.doctorTimeSlots = result.data.doctorTimeSlots.map((slot: any) => ({
            ...slot,
            startTime: this.convertTo12HourFormat(slot.startTime),
            endTime: this.convertTo12HourFormat(slot.endTime)
          }));
  
          this.doctorAvailability = result.data;
        }
      },
      (error: any) => {
        showErrorMessage(ResultMessages.serverError);
      }
    );
  }
  convertTo12HourFormat(time: string): string {
    if (!time) return '';
  
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
  
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  
}
