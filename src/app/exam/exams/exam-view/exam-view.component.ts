import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Exam } from '../../../apiTypes/exam';
import { LearningManagementService } from '../../services/learning-management.service';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.scss'],
})
export class ExamViewComponent implements OnInit {
  exam!: Exam;

  constructor(
    private dialogRef: MatDialogRef<ExamViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Exam,
    private examService: LearningManagementService
  ) {
    this.examService
      .getExamDetails(data.examId)
      .subscribe((x) => (this.exam = x.data));
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
