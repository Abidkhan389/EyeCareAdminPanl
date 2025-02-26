import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { STudentBehaviourSharedDataService } from '../student-dashboard/service/student-behaviour-shared-data.service';
import { StudentBehaviourService } from 'src/app/exam/services/student-behaviour.service';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-home',
  templateUrl: './course-home.component.html',
  styleUrl: './course-home.component.scss',
})
export class CourseHomeComponent implements OnInit{
  classRoomId:number;
  subjectId:number;
  studentId:number;
  isLoading:boolean=true;
  selectedTab: string = '';
  selectedIndex: number = 0; // Default to the first tab
  constructor(private route: ActivatedRoute,private sTudentBehaviourSharedDataService: STudentBehaviourSharedDataService,
      private studentBehaviourService: StudentBehaviourService,private message: MatSnackBar,private router: Router
     ){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedTab = params['tab'];
      switch (this.selectedTab) {
       
          case 'gradeBook':
            this.selectedIndex = 6;  // invoice tab
            break;
        default:
          this.selectedIndex = 0;  // Default to Profile tab
          break;
      }
    });
    this.route.params.subscribe((params) => {      
      this.classRoomId = +params['classroomId'];
      this.subjectId = +params['subjectId'];
      this.studentId = +params['studentId'];
    });
    if(this.classRoomId && this.subjectId && this.studentId)
    {
      this.loadStudentbBehaviourData();
    }
  }
  loadStudentbBehaviourData(){
    let model = Object.assign({});
    model.classRoomId=this.classRoomId;
    model.subjectId=this.subjectId;
    model.studentId=this.studentId;
    this.studentBehaviourService.GetBehaviorsByStudentIdAsync(model).subscribe({
          next: (response: RepoResponse<any[]>) => {
            if (response.success) {
              this.sTudentBehaviourSharedDataService.setData(response.data);
              this.isLoading = false;
            }
          },
          error: (err) => {
            this.showErrorMessage('Student Behaviour Can not be Updated  successfully');
            this.isLoading = false;
          },
        });
  }
  showSuccessMessage(successMessage: string) {
    this.message.open(successMessage, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['success-snackbar'], // Optional: for custom styling
    });
  }
  showErrorMessage(failMessage: string) {
    this.message.open(failMessage, 'Retry', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom', // or 'top'
      panelClass: ['error-snackbar'], // Optional: for custom styling
    });
  }

}
