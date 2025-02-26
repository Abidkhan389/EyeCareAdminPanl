import { Component, OnInit } from '@angular/core';
import { StudentDashboardServiceService } from '../../student-dashboard/service/student-dashboard-service.service';
import { Exam } from 'src/app/apiTypes/exam';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ConfirmDeleteResponseType } from 'src/app/shared/models/confirmDeleteResponseType';
import { StudentTakeExamComponent } from './student-take-exam/student-take-exam.component';

@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrl: './student-exams.component.scss',
})
export class StudentExamsComponent implements OnInit {
  studentId!: number;
  classroomId!: number;
  subjectId!: number;
  exams: Exam[] = [];
  constructor(
    private studentDashboardService: StudentDashboardServiceService,
    private route: ActivatedRoute,
    private dialog: ModalService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.classroomId = this.route.snapshot.params['classroomId'];
    this.subjectId = this.route.snapshot.params['subjectId'];
    this.studentDashboardService
      .getStudentExams(this.classroomId, this.subjectId)
      .subscribe((x) => {
        if (x.success) {
          this.exams = x.data;
        }
      });
  }

  isLate(dueDate: Date): boolean {
    return new Date(dueDate) < new Date();
  }

  startExam(exam: Exam): void {
    console.log(`Starting exam: ${exam.title}`);
    this.dialog
      .confirmAction(
        'Are you sure you want to take this exam?',
        'Yes Start Exam',
        'Cancel'
      )
      .subscribe((x) => {
        console.log(x);
        if (x === ConfirmDeleteResponseType.CONFIRMED) {
          this.dialog.open(StudentTakeExamComponent, exam, '99%', '99%', true);
        }
      });
  }

  viewExamDetails(exam: Exam): void {
    console.log(`Viewing exam: ${exam}`);
    // Implement logic to view exam details
  }
}
