import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { StudentParticipationDto } from 'src/app/apiTypes/participation';
import { StudentDashboardServiceService } from '../../student-dashboard/service/student-dashboard-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-participation',
  templateUrl: './student-participation.component.html',
  styleUrls: ['./student-participation.component.scss'],
})
export class StudentParticipationComponent implements OnInit {
  displayedColumns: string[] = [
    'participationDate',
    'studentName',
    'earnedPoints',
    'maxScore',
    'participationPeriod',
    'attendancePercentage',
    'comments',
    'isActive',
  ];
  dataSource = new MatTableDataSource<StudentParticipationDto>([]);
  totalLength = 0;
  pageSize = 10;
  pageIndex = 0;
  studentId: any;
  classroomId: any;
  subjectId: any;

  constructor(
    private studentDashboardService: StudentDashboardServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.classroomId = this.route.snapshot.params['classroomId'];
    this.subjectId = this.route.snapshot.params['subjectId'];
    this.fetchStudentParticipation(this.subjectId, this.studentId); // Replace with dynamic subjectId and studentId
  }

  fetchStudentParticipation(subjectId: number, studentId: number): void {
    this.studentDashboardService
      .getStudentParticipation(subjectId, studentId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.dataSource.data = response.data;
            this.totalLength = response.data.length;
          }
        },
        error: (error) => {
          console.error('Error fetching student participation:', error);
        },
      });
  }

  onPaginate(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    // Add pagination handling if needed
  }
}
