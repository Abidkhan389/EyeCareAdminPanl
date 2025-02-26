import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import { Assignment } from '../../apiTypes/assignment';
import { AlertService } from '../../shared/services/alert.service';
import { ALERT_TYPE } from '../../shared/models/alert';
import { Exam } from '../../apiTypes/exam';
import { FacultySubject } from '../../apiTypes/facultySubject';
import { Project, StudentDto } from '../../apiTypes/project';
import { StudentGradeDto } from '../gradebook/gradebook.component';
import { AssessmentGeneric } from '../../apiTypes/assessmentGeneric';
import {
  StudentParticipation,
  StudentParticipationDto,
} from '../../apiTypes/participation';
import { StudentAttendanceDto } from '../../apiTypes/studentAttendance';
import { AppDateService } from '../../shared/services/app-date.service';

@Injectable({
  providedIn: 'root',
})
export class LearningManagementService {
  private facultySubjects = new BehaviorSubject<FacultySubject[]>([]);
  private apiUrl = 'api/learningManagement';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private dateService: AppDateService
  ) {}

  getFacultySubjects(
    facultyId: number
  ): Observable<RepoResponse<FacultySubject[]>> {
    return this.http
      .get<RepoResponse<FacultySubject[]>>(
        `${this.apiUrl}/facultySubjects/${facultyId}`
      )
      .pipe(
        tap((response) => this.facultySubjects.next(response.data)),
        catchError((error) =>
          this.handleError('Failed to fetch faculty subjects', error)
        )
      );
  }

  getClassroomStudents(
    classroomId: number
  ): Observable<RepoResponse<StudentDto[]>> {
    const endpoint = `${this.apiUrl}/classroomStudents/${classroomId}`;
    return this.http
      .get<RepoResponse<StudentDto[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve project details', error)
        )
      );
  }

  ///////////////////// Generic Assessment Methods //////////
  getAssessmentInfo(
    assessmentId: number,
    assessmentType: string
  ): Observable<AssessmentGeneric> {
    let detailsObservable: Observable<any>;

    switch (assessmentType) {
      case 'Assignment':
        detailsObservable = this.getAssignmentDetailsById(assessmentId);
        break;
      case 'Project':
        detailsObservable = this.getProjectDetails(assessmentId);
        break;
      case 'Exam':
        detailsObservable = this.getExamDetails(assessmentId);
        break;
      default:
        throw new Error(`Unsupported assessment type: ${assessmentType}`);
    }

    return detailsObservable.pipe(
      map((response) => {
        if (response.success) {
          return {
            assessmentId: response.data[`${assessmentType.toLowerCase()}Id`],
            title: response.data.title,
            description: response.data.description ?? '',
            maxScore: response.data.maxScore,
          } as AssessmentGeneric;
        } else {
          throw new Error('Failed to fetch assessment details');
        }
      })
    );
  }

  //////////////////// ASSIGNMENTS //////////////////////////
  createAssignment(
    newAssignment: Assignment
  ): Observable<RepoResponse<Assignment>> {
    const endpoint = `${this.apiUrl}/assignment/create`;
    if (!newAssignment.assignmentId) newAssignment.assignmentId = 0;

    return this.http
      .post<RepoResponse<Assignment>>(endpoint, newAssignment)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to create assignment', error)
        )
      );
  }

  updateAssignment(
    assignmentId: number,
    updatedAssignment: Assignment
  ): Observable<RepoResponse<Assignment>> {
    const endpoint = `${this.apiUrl}/assignment/update/${assignmentId}`;

    return this.http
      .put<RepoResponse<Assignment>>(endpoint, updatedAssignment)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to update assignment', error)
        )
      );
  }

  softDeleteAssignment(
    assignmentId: number
  ): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/assignment/delete/${assignmentId}`;

    return this.http
      .delete<RepoResponse<boolean>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to delete assignment', error)
        )
      );
  }

  getAssignments(
    classId: number,
    subjectId: number
  ): Observable<RepoResponse<Assignment[]>> {
    const endpoint = `${this.apiUrl}/assignment/getAll/${classId}/${subjectId}`;

    return this.http
      .get<RepoResponse<Assignment[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve assignments', error)
        )
      );
  }

  getAssignmentDetailsById(
    assignmentId: number
  ): Observable<RepoResponse<Assignment>> {
    const endpoint = `${this.apiUrl}/assignment/details/${assignmentId}`;

    return this.http
      .get<RepoResponse<Assignment>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to fetch assignment details', error)
        )
      );
  }

  //////////////////// EXAMS //////////////////////////
  // Get all exams for a specific class and subject
  getExams(
    classId: number,
    subjectId: number
  ): Observable<RepoResponse<Exam[]>> {
    const endpoint = `${this.apiUrl}/exam/getAll/${classId}/${subjectId}`;
    return this.http
      .get<RepoResponse<Exam[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve exams', error)
        )
      );
  }

  // Get exam details, including questions, by examId
  getExamDetails(examId: number): Observable<RepoResponse<Exam>> {
    const endpoint = `${this.apiUrl}/exam/details/${examId}`;
    return this.http
      .get<RepoResponse<Exam>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve exam details', error)
        )
      );
  }

  // Create a new exam, optionally with questions
  createExam(newExam: Exam): Observable<RepoResponse<Exam>> {
    const endpoint = `${this.apiUrl}/exam/create`;
    return this.http
      .post<RepoResponse<Exam>>(endpoint, newExam)
      .pipe(
        catchError((error) => this.handleError('Failed to create exam', error))
      );
  }

  // Update an existing exam
  updateExam(exam: Exam): Observable<RepoResponse<Exam>> {
    const endpoint = `${this.apiUrl}/exam/update`;
    return this.http
      .put<RepoResponse<Exam>>(endpoint, exam)
      .pipe(
        catchError((error) => this.handleError('Failed to update exam', error))
      );
  }

  // Soft delete an exam by setting its active status to false
  deleteExam(examId: number): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/exam/delete/${examId}`;
    return this.http
      .delete<RepoResponse<boolean>>(endpoint)
      .pipe(
        catchError((error) => this.handleError('Failed to delete exam', error))
      );
  }

  ///////////////////// PROJECTS ////////////////////////////
  // Get all projects for a specific class and subject
  getAllProjects(
    classId: number,
    subjectId: number
  ): Observable<RepoResponse<Project[]>> {
    const endpoint = `${this.apiUrl}/project/getall/${classId}/${subjectId}`;
    return this.http
      .get<RepoResponse<Project[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve projects', error)
        )
      );
  }

  // Get details of a specific project
  getProjectDetails(projectId: number): Observable<RepoResponse<Project>> {
    const endpoint = `${this.apiUrl}/project/details/${projectId}`;
    return this.http
      .get<RepoResponse<Project>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve project details', error)
        )
      );
  }

  // Create a new project
  createProject(project: Project): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/project/create`;
    return this.http
      .post<RepoResponse<boolean>>(endpoint, project)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to create project', error)
        )
      );
  }

  // Update an existing project
  updateProject(project: Project): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/project/update`;
    return this.http
      .put<RepoResponse<boolean>>(endpoint, project)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to update project', error)
        )
      );
  }

  // Soft delete a project
  deleteProject(projectId: number): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/project/delete/${projectId}`;
    return this.http
      .delete<RepoResponse<boolean>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to delete project', error)
        )
      );
  }

  //////////////////// GRADES //////////////////////////

  postStudentsGrades(
    studentGradesDto: StudentGradeDto[]
  ): Observable<RepoResponse<any>> {
    const endpoint = `${this.apiUrl}/gradebook/postGrades`;

    return this.http
      .post<RepoResponse<Assignment>>(endpoint, studentGradesDto)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to post assessment grades', error)
        )
      );
  }

  getAssessmentGrades(
    assessmentId: number,
    assessmentType: string
  ): Observable<RepoResponse<any>> {
    const endpoint = `${this.apiUrl}/gradebook/GetAssessmentGrades/${assessmentId}/${assessmentType}`;

    return this.http
      .get<RepoResponse<StudentGradeDto[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to fetch asessment grades', error)
        )
      );
  }

  ///////////////////// Participation //////////////////////////
  getParticipation(
    studentId: number,
    subjectId: number
  ): Observable<RepoResponse<StudentParticipationDto>> {
    const endpoint = `${this.apiUrl}/participation/getParticipation?studentId=${studentId}&subjectId=${subjectId}`;
    return this.http
      .get<RepoResponse<StudentParticipationDto>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve participation details', error)
        )
      );
  }

  getAllParticipations(
    subjectId: number
  ): Observable<RepoResponse<StudentParticipationDto[]>> {
    const endpoint = `${this.apiUrl}/participation/getAllParticipations?subjectId=${subjectId}`;
    return this.http
      .get<RepoResponse<StudentParticipationDto[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve all participations', error)
        )
      );
  }

  getParticipationsByPeriod(
    subjectId: number,
    participationPeriod: string
  ): Observable<RepoResponse<StudentParticipationDto[]>> {
    const endpoint = `${this.apiUrl}/participation/getParticipationsByPeriod?subjectId=${subjectId}&participationPeriod=${participationPeriod}`;
    return this.http
      .get<RepoResponse<StudentParticipationDto[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve participations by period', error)
        )
      );
  }

  addParticipation(
    participation: StudentParticipation
  ): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/participation/addParticipation`;
    return this.http
      .post<RepoResponse<boolean>>(endpoint, participation)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to add participation', error)
        )
      );
  }

  updateParticipation(
    participation: StudentParticipation
  ): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/participation/updateParticipation`;
    return this.http
      .put<RepoResponse<boolean>>(endpoint, participation)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to update participation', error)
        )
      );
  }

  deleteParticipation(
    studentId: number,
    subjectId: number
  ): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/participation/deleteParticipation?studentId=${studentId}&subjectId=${subjectId}`;
    return this.http
      .delete<RepoResponse<boolean>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to delete participation', error)
        )
      );
  }

  getParticipationPeriods(): Observable<string[]> {
    const periods = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return of(periods); // Returns an Observable of the hardcoded periods
  }

  ///////////////////// Attendance /////////////////////////////
  getAttendanceById(
    attendanceId: number
  ): Observable<RepoResponse<StudentAttendanceDto>> {
    const endpoint = `${this.apiUrl}/studentAttendance/getAttendanceById?attendanceId=${attendanceId}`;
    return this.http
      .get<RepoResponse<StudentAttendanceDto>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve attendance by ID', error)
        )
      );
  }

  getAllAttendances(
    classId: number,
    subjectId: number
  ): Observable<RepoResponse<StudentAttendanceDto[]>> {
    const endpoint = `${this.apiUrl}/studentAttendance/getAllAttendances?classId=${classId}&subjectId=${subjectId}`;
    return this.http
      .get<RepoResponse<StudentAttendanceDto[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve attendances', error)
        )
      );
  }

  getAllAttendancesWithDateFilter(
    classId: number,
    subjectId: number,
    forDate: Date
  ): Observable<RepoResponse<StudentAttendanceDto[]>> {
    const formattedDate = this.dateService.getDateOnly(forDate);
    const endpoint = `${this.apiUrl}/studentAttendance/getAllAttendances?classId=${classId}&subjectId=${subjectId}&forDate=${formattedDate}`;
    return this.http
      .get<RepoResponse<StudentAttendanceDto[]>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to retrieve attendances', error)
        )
      );
  }

  createAttendance(
    attendance: StudentAttendanceDto
  ): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/studentAttendance/createAttendance`;
    return this.http
      .post<RepoResponse<boolean>>(endpoint, attendance)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to create attendance', error)
        )
      );
  }

  updateAttendance(
    attendance: StudentAttendanceDto
  ): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/studentAttendance/updateAttendance`;
    return this.http
      .put<RepoResponse<boolean>>(endpoint, attendance)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to update attendance', error)
        )
      );
  }

  deleteAttendance(attendanceId: number): Observable<RepoResponse<boolean>> {
    const endpoint = `${this.apiUrl}/studentAttendance/deleteAttendance?attendanceId=${attendanceId}`;
    return this.http
      .delete<RepoResponse<boolean>>(endpoint)
      .pipe(
        catchError((error) =>
          this.handleError('Failed to delete attendance', error)
        )
      );
  }

  //////////////////// ERROR HANDLING //////////////////////////
  private handleError(message: string, error: any) {
    this.alertService.alert(message, ALERT_TYPE.ERROR);
    console.error(`${message}:`, error); // For debugging
    return throwError(() => new Error(error));
  }
}
