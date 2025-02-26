import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { IStudent } from '../../models/student';
import { MatSort } from '@angular/material/sort';
import { StudentService } from '../../services/student.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { RepoResponse } from '../../../apiTypes/RepoResponse';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  students = new MatTableDataSource<IStudent>([]);
  isVisible: boolean = false;
  isLoading = true;

  columns: string[] = [
    'select',
    'firstName',
    'lastName',
    'phoneNumber',
    'actions',
  ];
  selectedRows = new SelectionModel<IStudent>(true, []);

  private destroy$ = new Subject<void>();

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getStudents();
  }
  ngOnInit(): void {
    this.getStudents();
  }
  getStudents() {
      this.studentService.getStudents().subscribe({
        next: (response: RepoResponse<IStudent[]>) => {
          if (response.success) {
            this.students = new MatTableDataSource(response.data);
            this.students.paginator = this.paginator;
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }

  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.students.filter = filterValue;

    if (this.students.paginator) {
      this.students.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    const numRows = this.students.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }

    this.selectedRows.select(...this.students.data);
  }

  createStudent() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  editStudent(id: string) {
    this.router.navigate([`edit/${id}`], { relativeTo: this.route });
  }
  viewStudent(studentId: number): void {
    this.router.navigate([`view/${studentId}`],{relativeTo:this.route});
  }
  deleteStudent(id: string) {}
  deleteSelectedStudents()
  {
    
  }

  selectStudent(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
