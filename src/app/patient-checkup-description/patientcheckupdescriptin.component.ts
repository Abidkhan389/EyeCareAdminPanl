import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-patientcheckupdescriptin',
  templateUrl: './patientcheckupdescriptin.component.html',
})
export class PatientcheckupdescriptinComponent {
title = new BehaviorSubject<string>('PatientAppointment');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      // if (data['title']) {
      //   this.title.next(data['title']); // Dynamically update title from route data
      // }
    });
  }
}
