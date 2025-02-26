import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../../models/student';
import { ParentPerson } from '../../../../apiTypes/parentperson';
import { StudentAccount } from '../../../../apiTypes/studentaccount';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { RepoResponse } from '../../../../apiTypes/RepoResponse';
import { StudentCreateDto } from '../../../../apiTypes/studentPostDto';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrl: './detail-component.component.scss'
})
export class DetailComponentComponent implements OnInit {
  student: IStudent | undefined;
  studentData!: IStudent; // To hold initial student data
  parentData!: ParentPerson[]; // To hold initial parent data
  accountData!: StudentAccount; // To hold initial account data
  isLoading = true;
  isView:boolean=true;
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
