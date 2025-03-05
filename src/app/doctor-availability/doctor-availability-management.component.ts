import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-doctor-availability-management',
  templateUrl: './doctor-availability-management.component.html',
})
export class DoctorAvailabilityManagementComponent {
title = new BehaviorSubject<string>('DoctorAvailability');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['title']) {
        this.title.next(data['title']); // Dynamically update title from route data
      }
    });
  }
}
