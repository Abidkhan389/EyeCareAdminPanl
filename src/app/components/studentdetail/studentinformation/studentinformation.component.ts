import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../apiTypes/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-studentinformation',
  templateUrl: './studentinformation.component.html',
  styleUrl: './studentinformation.component.css'
})

export class StudentinformationComponent implements OnInit{
  @Input() studentData!: Student| undefined;

  constructor() {   
  }
  ngOnInit(): void {
  }
}
