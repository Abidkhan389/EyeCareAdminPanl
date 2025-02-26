import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentPerson } from 'src/app/apiTypes/parentperson';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { StudentAccount } from 'src/app/apiTypes/studentaccount';
import { StudentCreateDto } from 'src/app/apiTypes/studentPostDto';
import { Patterns } from 'src/app/shared/Validators/patterns';
import { NoWhitespaceValidator } from 'src/app/shared/Validators/validators';
import { IStudent } from 'src/app/student/models/student';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent {
  studentForm!: FormGroup;
  parentFormGroup!: FormGroup;
  studentAccountForm: FormGroup;
  student: IStudent | undefined;
  studentData !: IStudent; // To hold initial student data
  parentData !: ParentPerson[]; // To hold initial parent data
  accountData !: StudentAccount; // To hold initial account data
  isLoading = true;
  isView:boolean=true;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (studentId !== null) {
      this.studentService.getStudentForEdit(studentId).subscribe({
        next: (response: RepoResponse<StudentCreateDto>) => {
          if (response.success) {
            this.studentData = response.data.studentInfo;
            this.parentData = response.data.parentPersons;
            this.accountData = response.data.account;            
            this.isLoading = false;
          }
        },
      });
    } else {
      this.router.navigate(['/students']);
    }
   

  }
}
