import { Component, OnInit } from '@angular/core';
import { StudentDashboardServiceService } from './service/student-dashboard-service.service';
import { StudentSubject } from 'src/app/apiTypes/studentSubject';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentGradesViewComponent } from '../components/student-grades-view/student-grades-view.component';
import { GradeBookService } from './service/grade-book.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  courseList: StudentSubject[] = [];
  filteredCourses: StudentSubject[] = [];
  studentGradesData:any;
  selectedCategory = 'All';
  studentId!: number;

  constructor(
    private studentDashboardService: StudentDashboardServiceService,private router: Router,
    private route: ActivatedRoute,private gradeBookService : GradeBookService
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('studentId'));
    // Fetch student subjects dynamically
    this.studentDashboardService
      .getStudentSubjects(this.studentId)
      .subscribe((response) => {
        if (response.success) {
          this.courseList = response.data;
          this.filteredCourses = [...this.courseList]; // Initialize filtered list
        } else {
          console.error('Error fetching student subjects:', response.errors);
        }
      });
      this.loadStudentGrades();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCourses = this.courseList.filter((course) =>
      course.subjectLabel.toLowerCase().includes(filterValue)
    );
  }

  ddlChange(ob: any): void {
    const filterValue = ob.value;
    if (filterValue === 'All') {
      this.filteredCourses = [...this.courseList];
    } else {
      this.filteredCourses = this.courseList.filter(
        (course) => course.subjectCategory === filterValue
      );
    }
  }

  loadStudentGrades()
  {
    this.studentDashboardService
    .getStudentGrades(this.studentId)
    .subscribe((response) => {
      if (response.success) {
        this.studentGradesData = response.data;
        const data = {
          studentGradesData: this.studentGradesData, // Contains grades data for students
          quarterCount: this.studentGradesData.quarterCount, // Quarter count from grades data
          subjectQuarterWiseReport: this.studentGradesData.subjectQuarterWiseReport // Subject quarter-wise report
        };
this.gradeBookService.setData(data);
      } else {
        console.error('Error fetching student Grades:', response.errors);
      }
    });
  }
  
}
