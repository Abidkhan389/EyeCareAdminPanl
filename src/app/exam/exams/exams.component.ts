import { Component, ViewChild } from '@angular/core';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { Exam } from '../../apiTypes/exam';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalService } from '../../shared/services/modal.service';
import { ConfirmDeleteResponseType } from '../../shared/models/confirmDeleteResponseType';
import { AlertService } from '../../shared/services/alert.service';
import { ALERT_TYPE } from '../../shared/models/alert';
import { LearningManagementService } from '../services/learning-management.service';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamViewComponent } from './exam-view/exam-view.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent {
  isLoading = true;
  exams = new MatTableDataSource<Exam>([]);
  selectedRows = new SelectionModel<Exam>(true, []);
  columns = ['select', 'title', 'dueDate', 'maxScore', 'actions'];

  private classId!: number;
  private subjectId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private examService: LearningManagementService,
    private dialog: MatDialog,
    private router: Router,
    private modalService: ModalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.classId = +params['classId'];
      this.subjectId = +params['subjectId'];
      this.loadExams();
    });
  }

  loadExams(): void {
    this.isLoading = true;
    this.examService
      .getExams(this.classId, this.subjectId)
      .subscribe((response: RepoResponse<Exam[]>) => {
        this.isLoading = false;
        this.exams.data = response.data || [];
        this.exams.paginator = this.paginator; 
      });
  }

  createExam(): void {
    const dialogref = this.dialog.open(ExamFormComponent, {
      disableClose: true,
      autoFocus: false,
      width: '70%',
      data: {
        classId: this.classId,
        subjectId: this.subjectId,
        isEdit: false,
        examId: null,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.loadExams();
        }
      },
    });
  }

  viewExam(examId: number): void {
    const exam = this.exams.data.find((x) => x.examId === examId);
    
    const dialogref = this.dialog.open(ExamViewComponent, {
      disableClose: true,
      autoFocus: false,
      width: '80%',
      height: '90vh',
      data: exam,
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.loadExams();
        }
      },
    });
  }

  editExam(examId: number): void {
    this.dialog.open(ExamFormComponent, {
      width: '70%',
      data: {
        classId: this.classId,
        subjectId: this.subjectId,
        isEdit: true,
        examId: examId,
        refreshMethod: this.loadExams.bind(this),
      },
    });
  }

  deleteExam(examId: number): void {
    this.modalService
      .confirmDelete()
      .subscribe((response: ConfirmDeleteResponseType) => {
        if (response === ConfirmDeleteResponseType.CONFIRMED) {
          this.doDeleteExam(examId);
        }
      });
  }

  doDeleteExam(examId: number): void {
    this.examService
      .deleteExam(examId)
      .subscribe((response: RepoResponse<boolean>) => {
        if (response.success) {
          this.alertService.alert(
            'Exam deleted successfully',
            ALERT_TYPE.SUCCESS
          );
          this.loadExams();
        } else {
          this.alertService.alert(
            'Something went wrong: ' + response.errors[0],
            ALERT_TYPE.ERROR
          );
        }
      });
  }

  filterData(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.exams.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.exams.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
    } else {
      this.exams.data.forEach((row) => this.selectedRows.select(row));
    }
  }

  deleteSelectedExams() {}
}
