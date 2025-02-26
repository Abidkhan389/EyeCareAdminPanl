import { Component, Input, OnInit } from '@angular/core';
import { StudentAccount } from '../../../apiTypes/studentaccount';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-studentaccountinformation',
  templateUrl: './studentaccountinformation.component.html',
  styleUrl: './studentaccountinformation.component.css'
})
export class StudentaccountinformationComponent implements OnInit {
  studentAccountForm: FormGroup;
  @Input() accountData!: StudentAccount|undefined;
  constructor(private fb: FormBuilder){
    this.studentAccountForm = this.fb.group({
      id: [null],
      studentId: [null],
      gradeId: [null],
      annualFee: [null, Validators.required],
      registrationFee: [null, Validators.required],
      transportationFee: [null, Validators.required],
      paymentPlanType: [null, Validators.required],
      gradeName: ['', Validators.required],
      schoolYearPeriod: [null, Validators.required],
      isActive: [true, Validators.required]
    });
  }
  ngOnInit(): void {
    if (this.accountData) {
      this.studentAccountForm.patchValue(this.accountData); // Load data if available
    }
  }  
}
