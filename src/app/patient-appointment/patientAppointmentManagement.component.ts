import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patientAppointmentManagement',
  templateUrl: './patientAppointmentManagement.component.html'
})
export class patientAppointmentManagementComponent {
  title = new BehaviorSubject<string>('PatientAppointment');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['title']) {
        this.title.next(data['title']); // Dynamically update title from route data
      }
    });
  }
}
