import { Component, Input, OnInit } from '@angular/core';
import { IStudent } from '../../../models/student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent implements OnInit{
  @Input() studentData!: IStudent| undefined;

  constructor() {   
  }
  ngOnInit(): void {
  }
}