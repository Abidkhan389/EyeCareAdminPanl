import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentPerson } from '../../../apiTypes/parentperson';

@Component({
  selector: 'app-studentparentinformation',
  templateUrl: './studentparentinformation.component.html',
  styleUrl: './studentparentinformation.component.css'
})
export class StudentparentinformationComponent {
  parentFormGroup!: FormGroup;
  @Input() parentData!: ParentPerson[];
  constructor(private fb: FormBuilder) {
   
  }
  ngOnInit(): void {
    //this.emitFormStatus();
    this.parentFormGroup = this.fb.group({
      parents: this.fb.array([this.createParentFormGroup()]) // FormArray named 'parents'
    });
    if (this.parentData) {
      this.parentFormGroup.patchValue(this.parentData); // Load data if available
    }
  }
  createParentFormGroup(): FormGroup {
    return this.fb.group({
      countryCode: ['+1', Validators.required],
      homePhone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employer: [''],
      isEmployed: [true],
      employerNumber: [''],
      employerAddress: [''],
      emergencyContact: ['', Validators.required],
      salary: [null, Validators.required]
    });
  }
}
