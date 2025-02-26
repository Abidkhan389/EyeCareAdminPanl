import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../../apiTypes/student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { StudentCreateDto } from '../../apiTypes/studentPostDto';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { ParentPerson } from '../../apiTypes/parentperson';
import { StudentAccount } from '../../apiTypes/studentaccount';
import { StudentinformationComponent } from './studentinformation/studentinformation.component';
import { StudentparentinformationComponent } from './studentparentinformation/studentparentinformation.component';
import { StudentaccountinformationComponent } from './studentaccountinformation/studentaccountinformation.component';

@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrl: './studentdetail.component.css',
})
export class StudentdetailComponent implements OnInit {
  //@ViewChild(StudentinformationComponent) studentinformationComponent!: StudentinformationComponent;
  //@ViewChild(StudentparentinformationComponent) studentparentinformationComponent!: StudentparentinformationComponent;
  //@ViewChild(StudentaccountinformationComponent) studentAccountinformationComponent!: StudentaccountinformationComponent;
  student: Student | undefined;
  studentData!: Student; // To hold initial student data
  parentData!: ParentPerson[]; // To hold initial parent data
  accountData!: StudentAccount; // To hold initial account data
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
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
