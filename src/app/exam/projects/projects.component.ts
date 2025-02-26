import { Component, ViewChild } from '@angular/core';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { ActivatedRoute } from '@angular/router';
import { LearningManagementService } from '../services/learning-management.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalService } from '../../shared/services/modal.service';
import { ConfirmDeleteResponseType } from '../../shared/models/confirmDeleteResponseType';
import { AlertService } from '../../shared/services/alert.service';
import { ALERT_TYPE } from '../../shared/models/alert';
import { Project } from '../../apiTypes/project';
import { ProjectFormComponent } from './projects-form/projects-form.component';
import { ProjectViewComponent } from './projects-view/projects-view.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  isLoading = true;
  projects = new MatTableDataSource<Project>([]);
  selectedRows = new SelectionModel<Project>(true, []);
  columns = ['select', 'title', 'dueDate', 'maxScore', 'actions'];

  private classId!: number;
  private subjectId!: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private learningManagementService: LearningManagementService,
    private dialog: MatDialog,
    private modalService: ModalService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.classId = +params['classId'];
      this.subjectId = +params['subjectId'];
      this.loadProjects();
    });
  }

  loadProjects(): void {
    this.isLoading = true;
    this.learningManagementService
      .getAllProjects(this.classId, this.subjectId)
      .subscribe((response: RepoResponse<Project[]>) => {
        this.isLoading = false;
        this.projects.data = response.data || [];
        this.projects.paginator = this.paginator;
      });
  }

  createProject(): void {
    // this.dialog.open(ProjectFormComponent, {
    //   width: '80%',
    //   height:'45%',
    //   data: {
    //     classId: this.classId,
    //     subjectId: this.subjectId,
    //     isEdit: false,
    //     projectId: null,
    //     refreshMethod: this.loadProjects.bind(this),
    //   },
    // });
    const dialogref = this.dialog.open(ProjectFormComponent, {
      disableClose: true,
      autoFocus: false,
      width: '80%',
      height: '38vh',
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
          this.loadProjects();
        }
      },
    });
  }

  viewProject(projectId: number): void {
    const project = this.projects.data.find((x) => x.projectId == projectId);
    this.dialog.open(ProjectViewComponent, {
      width: '70%',
      data: project,
    });
  }

  editProject(projectId: number): void {
    this.dialog.open(ProjectFormComponent, {
      width: '70%',
      data: {
        classId: this.classId,
        subjectId: this.subjectId,
        isEdit: true,
        projectId: projectId,
        refreshMethod: this.loadProjects.bind(this),
      },
    });
  }

  deleteProject(projectId: number): void {
    this.modalService
      .confirmDelete()
      .subscribe((x: ConfirmDeleteResponseType) => {
        if (x === ConfirmDeleteResponseType.CONFIRMED) {
          this.doDeleteProject(projectId);
        }
      });
  }

  doDeleteProject(projectId: number): void {
    this.learningManagementService
      .deleteProject(projectId)
      .subscribe((x: RepoResponse<boolean>) => {
        if (x.success) {
          this.alertService.alert(
            'Project deleted successfully',
            ALERT_TYPE.SUCCESS
          );
          this.loadProjects();
        } else {
          this.alertService.alert(
            'Something went wrong: ' + x.errors[0],
            ALERT_TYPE.ERROR
          );
        }
      });
  }

  deleteSelectedProjects(): void {
    const selectedIds = this.selectedRows.selected.map(
      (project) => project.projectId
    );
    // Call API to delete selected projects by IDs
  }

  filterData(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projects.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.projects.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
    } else {
      this.projects.data.forEach((row) => this.selectedRows.select(row));
    }
  }
}
