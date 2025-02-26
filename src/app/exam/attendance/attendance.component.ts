import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LearningManagementService } from '../services/learning-management.service';
import {
  AttendanceStatus,
  StudentAttendanceDto,
} from '../../apiTypes/studentAttendance';
import { StudentDto } from '../../apiTypes/project';
import { AlertService } from '../../shared/services/alert.service';
import { ALERT_TYPE } from '../../shared/models/alert';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  dateControl = new FormControl(null); // Start with no date selected
  dataSource = new MatTableDataSource<StudentAttendanceDto>([]);
  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'attendanceStatus',
    'comments',
    'actions',
  ];
  classId!: number;
  subjectId!: number;
  editingRow: StudentAttendanceDto | null = null; // Track row being edited
  isAttendanceTaken = false; // Tracks if attendance has been taken for the date
  records: StudentAttendanceDto[] = [];

  constructor(
    private learningManagementService: LearningManagementService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // Get classId and subjectId from route params
    this.route.params.subscribe((params) => {
      this.classId = +params['classId'];
      this.subjectId = +params['subjectId'];
    });
  }

  onGetAttendance(): void {
    const attendanceDate = this.dateControl.value;
    if (!attendanceDate) return;
    if (new Date(attendanceDate) > new Date()) {
      this.alertService.alert(
        'Attendance can not be in the future, please select another day',
        ALERT_TYPE.ERROR
      );
      return;
    }
    // Check for existing attendance data
    this.learningManagementService
      .getAllAttendancesWithDateFilter(
        this.classId,
        this.subjectId,
        attendanceDate
      )
      .subscribe(
        (response) => {
          if (response.data && response.data.length > 0) {
            this.isAttendanceTaken = true;
            this.dataSource.data = response.data;
          } else {
            this.isAttendanceTaken = false;
            this.loadClassroomStudents();
          }
        },
        (error) => console.error('Failed to retrieve attendance data', error)
      );
  }

  loadClassroomStudents(): void {
    this.learningManagementService.getClassroomStudents(this.classId).subscribe(
      (response) => {
        this.records = response.data.map((x) => {
          return {
            studentDto: x,
            studentId: x.studentId,
            comments: '',
            createdDate: new Date(),
            attendanceForDay: this.dateControl.value ?? new Date(),
            classId: this.classId,
            subjectId: this.subjectId,
            attendanceId: 0,
          } as StudentAttendanceDto;
        });
      },
      (error) => console.error('Failed to load classroom students', error)
    );
  }

  saveAttendance(row: StudentAttendanceDto): void {
    if (this.editingRow) {
      this.learningManagementService
        .updateAttendance(this.editingRow)
        .subscribe(
          () => {
            Object.assign(row, this.editingRow); // Apply changes to row
            this.editingRow = null; // Exit edit mode
          },
          (error) => console.error('Failed to update attendance', error)
        );
    }
  }

  editAttendance(row: StudentAttendanceDto): void {
    this.editingRow = { ...row }; // Enable edit mode for selected row
  }

  cancelEdit(): void {
    this.editingRow = null; // Exit edit mode
  }

  attendanceStatusOptions = [
    { value: AttendanceStatus.Present, label: 'Present' },
    { value: AttendanceStatus.Late, label: 'Late' },
    { value: AttendanceStatus.Absent, label: 'Absent' },
  ];

  getAttendanceLabel(attendanceStatus: any) {
    return this.attendanceStatusOptions.find(
      (x) => x.value == attendanceStatus
    )!.label;
  }
  onSubmitAttendance(): void {
    const attendanceDate = this.dateControl.value;
    const attendanceRecords = this.records;

    attendanceRecords.forEach((record) => {
      this.learningManagementService.createAttendance(record).subscribe(
        () => {
          console.log('Attendance successfully submitted');
          this.isAttendanceTaken = true;
          this.onGetAttendance(); // Refresh the attendance table after submission
        },
        (error) => console.error('Failed to submit attendance', error)
      );
    });
  }
}
