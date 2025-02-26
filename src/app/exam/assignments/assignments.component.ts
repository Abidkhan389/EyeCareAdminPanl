import { Component, ViewChild } from '@angular/core';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { Assignment } from '../../apiTypes/assignment';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningManagementService } from '../services/learning-management.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentViewComponent } from './assignment-view/assignment-view.component';
import { ModalService } from '../../shared/services/modal.service';
import { ConfirmDeleteResponseType } from '../../shared/models/confirmDeleteResponseType';
import { AlertService } from '../../shared/services/alert.service';
import { ALERT_TYPE } from '../../shared/models/alert';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss',
})
export class AssignmentsComponent {
  isLoading = true;
  assignments = new MatTableDataSource<Assignment>([]);
  selectedRows = new SelectionModel<Assignment>(true, []);
  columns = ['select', 'title', 'dueDate', 'maxScore', 'actions'];

  private classId!: number;
  private subjectId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private learningManagementService: LearningManagementService,
    private dialog: MatDialog,
    private router: Router,
    private modalService: ModalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.classId = +params['classId'];
      this.subjectId = +params['subjectId'];
      this.loadAssignments();
    });
  }

  loadAssignments(): void {
    this.isLoading = true;
    this.learningManagementService
      .getAssignments(this.classId, this.subjectId)
      .subscribe((response: RepoResponse<Assignment[]>) => {
        this.isLoading = false;
        this.assignments.data = response.data || [];
        this.assignments.paginator = this.paginator;
      });
  }

  createAssignment(): void {
    // this.dialog.open(AssignmentFormComponent, {
    //   width: '70%',
    //   data: {
    //     classId: this.classId,
    //     subjectId: this.subjectId,
    //     isEdit: false,
    //     assignmentId: null,
    //     refreshMethod: this.loadAssignments.bind(this),
    //   },
    // });
    const dialogref = this.dialog.open(AssignmentFormComponent, {
      disableClose: true,
      autoFocus: false,
      width: '80%',
      height: '50vh',
      data: {
        classId: this.classId,
        subjectId: this.subjectId,
        isEdit: false,
        projectId: null,
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.loadAssignments();
        }
      },
    });
  }

  viewAssignment(assignmentId: number): void {
    const assignment = this.assignments.data.find(
      (x) => x.assignmentId == assignmentId
    );
    this.dialog.open(AssignmentViewComponent, {
      width: '70%',
      data: assignment,
    });
  }

  editAssignment(assignmentId: number): void {
    this.dialog.open(AssignmentFormComponent, {
      width: '70%',
      data: {
        classId: this.classId,
        subjectId: this.subjectId,
        isEdit: true,
        assignmentId: assignmentId,
        refreshMethod: this.loadAssignments.bind(this),
      },
    });
  }

  deleteAssignment(assignmentId: number): void {
    // Delete single assignment
    this.modalService
      .confirmDelete()
      .subscribe((x: ConfirmDeleteResponseType) => {
        if (x === ConfirmDeleteResponseType.CONFIRMED) {
          this.doDeleteAssignment(assignmentId);
        }
      });
  }
  doDeleteAssignment(assignmentId: number) {
    this.learningManagementService
      .softDeleteAssignment(assignmentId)
      .subscribe((x: RepoResponse<boolean>) => {
        if (x.success) {
          this.alertService.alert(
            'Assignment deleted successfully',
            ALERT_TYPE.SUCCESS
          );
          this.loadAssignments();
        } else {
          this.alertService.alert(
            'Something went wrong: ' + x.errors[0],
            ALERT_TYPE.ERROR
          );
        }
      });
  }

  deleteSelectedAssignments(): void {
    const selectedIds = this.selectedRows.selected.map(
      (assignment) => assignment.assignmentId
    );
    // Call API to delete selected assignments by IDs
  }

  filterData(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.assignments.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.assignments.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
    } else {
      this.assignments.data.forEach((row) => this.selectedRows.select(row));
    }
  }
}
