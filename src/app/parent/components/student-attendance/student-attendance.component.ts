import { Component } from '@angular/core';
import { StudentDashboardServiceService } from '../../student-dashboard/service/student-dashboard-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { StudentAttendanceDto } from 'src/app/apiTypes/studentAttendance';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss'],
})
export class StudentAttendanceComponent {
  constructor(
    private studentDashboardService: StudentDashboardServiceService,
    private route: ActivatedRoute
  ) {}

  studentId!: number;
  classroomId!: number;
  subjectId!: number;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'attendanceForDay',
    'studentName',
    'attendanceStatus',
    'comments',
  ];
  attendanceData!: StudentAttendanceDto[];
  groupedAttendanceData: { date: Date; records: StudentAttendanceDto[] }[] = [];
  totalLength: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.classroomId = this.route.snapshot.params['classroomId'];
    this.subjectId = this.route.snapshot.params['subjectId'];
    this.loadData();
  }

  loadData(): void {
    this.studentDashboardService
      .getStudentAttendance(this.classroomId, this.subjectId, this.studentId)
      .subscribe((response: RepoResponse<StudentAttendanceDto[]>) => {
        this.attendanceData = response.data;

        // Extract distinct attendance days and group records by day
        const uniqueDates = [
          ...new Set(
            this.attendanceData.map((record) => record.attendanceForDay)
          ),
        ];

        this.groupedAttendanceData = uniqueDates.map((date) => ({
          date,
          records: this.attendanceData.filter(
            (record) => record.attendanceForDay === date
          ),
        }));

        // Initialize the paginator with the first page
        this.totalLength = this.groupedAttendanceData.length;
        this.updatePageData(0, this.pageSize);
      });
  }

  onPaginate(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.updatePageData(startIndex, endIndex);
  }

  updatePageData(startIndex: number, endIndex: number): void {
    const pageData = this.groupedAttendanceData.slice(startIndex, endIndex);
    // Flatten the records for the current page to show in the table
    this.dataSource.data = pageData.flatMap((group) => group.records);
  }
}
