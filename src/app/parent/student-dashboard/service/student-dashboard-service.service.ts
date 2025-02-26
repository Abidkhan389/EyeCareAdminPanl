import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentSubject } from 'src/app/apiTypes/studentSubject';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RepoResponse } from 'src/app/apiTypes/RepoResponse';
import { Project, StudentDto } from 'src/app/apiTypes/project';
import { ParentPerson } from 'src/app/apiTypes/parentperson';
import { StudentAssignment } from 'src/app/apiTypes/studentAssignment';
import {
  Attachment,
  StudentSubmissionsDetailsDto,
} from 'src/app/apiTypes/studentAssignmentSubmissionDto';
import { StudentAttendanceDto } from 'src/app/apiTypes/studentAttendance';
import { StudentParticipationDto } from 'src/app/apiTypes/participation';
import { Exam } from 'src/app/apiTypes/exam';

@Injectable({
  providedIn: 'root',
})
export class StudentDashboardServiceService {
  private readonly apiBase = '/api/ParentStudentDashboard';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.authService.getCurrentUser().roles;
    return requiredRoles.some((role) => userRoles.includes(role.toUpperCase()));
  }

  getStudentSubjects(
    studentId: number | string
  ): Observable<RepoResponse<StudentSubject[]>> {
    if (!this.hasRole(['Admin', 'SuperAdmin', 'StudentParent', 'Student'])) {
      throw new Error('Unauthorized');
    }

    return this.http.get<RepoResponse<StudentSubject[]>>(
      `${this.apiBase}/getStduentSubjects/${studentId}`
    );
  }


  getStudentGrades(
    studentId: number | string
  ): Observable<RepoResponse<StudentSubject[]>> {
    if (!this.hasRole(['Admin', 'SuperAdmin', 'StudentParent', 'Student'])) {
      throw new Error('Unauthorized');
    }

    return this.http.get<RepoResponse<StudentSubject[]>>(
      `${this.apiBase}/getStudentGradeReport/${studentId}`
    );
  }

  getStudentAttendance(
    classroomId: number,
    subjectId: number,
    studentId: number
  ): Observable<RepoResponse<StudentAttendanceDto[]>> {
    if (!this.hasRole(['Admin', 'SuperAdmin', 'StudentParent', 'Student'])) {
      throw new Error('Unauthorized');
    }
    const params = { studentId, classroomId, subjectId };
    const url = `${this.apiBase}/GetStudentAttendance`;

    return this.http.get<RepoResponse<StudentAttendanceDto[]>>(url, { params });
  }

  getStudentParticipation(
    subjectId: number,
    studentId: number
  ): Observable<RepoResponse<StudentParticipationDto[]>> {
    if (!this.hasRole(['Admin', 'SuperAdmin', 'StudentParent', 'Student'])) {
      throw new Error('Unauthorized');
    }
    const params = { studentId, subjectId };
    const url = `${this.apiBase}/GetStudentParticipation`;

    return this.http.get<RepoResponse<StudentParticipationDto[]>>(url, {
      params,
    });
  }

  getStudentExams(
    classroomId: number,
    subjectId: number
  ): Observable<RepoResponse<Exam[]>> {
    if (!this.hasRole(['Admin', 'SuperAdmin', 'StudentParent', 'Student'])) {
      throw new Error('Unauthorized');
    }
    const params = { classroomId, subjectId };
    const url = `${this.apiBase}/GetStudentExams`;

    return this.http.get<RepoResponse<Exam[]>>(url, {
      params,
    });
  }

  getStudentAssignments(
    studentId: number,
    classroomId: number,
    subjectId: number
  ): Observable<RepoResponse<StudentAssignment[]>> {
    const url = `${this.apiBase}/getstudentassignments`;
    const params = { studentId, classroomId, subjectId };

    return this.http.get<RepoResponse<StudentAssignment[]>>(url, { params });
  }

  submitStudentAssignment(
    studentAssignmentSubmissionDto: FormData
  ): Observable<RepoResponse<boolean>> {
    const url = `${this.apiBase}/submitstudentassignment`;
    return this.http.post<RepoResponse<boolean>>(
      url,
      studentAssignmentSubmissionDto
    );
  }

  createSubmissionFormData(
    studentId: number,
    classroomId: number,
    subjectId: number,
    assessmentId: number,
    comments: string,
    assessmentType: any,
    file: any | undefined
  ): FormData {
    const formData = new FormData();
    formData.append('StudentId', studentId.toString());
    formData.append('ClassroomId', classroomId.toString());
    formData.append('SubjectId', subjectId.toString());
    formData.append('AssignmentId', assessmentId.toString()); //TODO: Remove this and keep assessmentId below
    formData.append('Comments', comments);
    formData.append('AssessmentId', assessmentId.toString());
    formData.append('AssessmentType', assessmentType.toString());
    formData.append('File', file._files[0], file._fileNames);
    return formData;
  }

  submitStudentProject(formData: FormData): Observable<RepoResponse<boolean>> {
    const url = `${this.apiBase}/submitstudentproject`;
    return this.http.post<RepoResponse<boolean>>(url, formData);
  }
  submitStudentExam(examObj: {
    studentId: number;
    classroomId: number;
    subjectId: number;
    assessmentId: number;
    stringifiedObject: string;
    assessmentType: number;
  }): Observable<RepoResponse<boolean>> {
    const url = `${this.apiBase}/submitStudentExam`;
    return this.http.post<RepoResponse<boolean>>(url, examObj);
  }

  getStudentProjects(
    studentId: number,
    classroomId: number,
    subjectId: number
  ): Observable<RepoResponse<Project[]>> {
    const url = `${this.apiBase}/getstudentprojects`;
    const params = { studentId, classroomId, subjectId };

    return this.http.get<RepoResponse<Project[]>>(url, { params });
  }

  getStudentSubmissionsDetails(
    submissionId: number
  ): Observable<RepoResponse<StudentSubmissionsDetailsDto>> {
    const url = `${this.apiBase}/getSubmissionDetails`;
    const params = { submissionId };

    return this.http.get<RepoResponse<StudentSubmissionsDetailsDto>>(url, {
      params,
    });
  }

  downloadAttachment(attachment: Attachment) {
    this.downloadDocument(`/api/file/download/${attachment.attachmentId}`);
  }
  downloadDocument(endpointUrl: string): void {
    this.http
      .get(endpointUrl, { responseType: 'blob', observe: 'response' }) // Observe the full response
      .subscribe({
        next: (response) => {
          const fileName =
            this.getFileNameFromHeaders(response.headers) ||
            'downloaded-file.pdf';
          this.triggerFileDownload(response.body, fileName);
        },
        error: (error) => {
          console.error('Error downloading the file:', error);
        },
      });
  }

  private getFileNameFromHeaders(headers: HttpHeaders): string | null {
    const contentDisposition = headers.get('Content-Disposition');
    if (contentDisposition) {
      const matches = contentDisposition.match(/filename="?(.*)"?$/);
      return matches && matches[1] ? matches[1] : null;
    }
    return null;
  }

  private triggerFileDownload(blob: Blob | null, fileName: string): void {
    if (!blob) {
      console.error('No file content available to download.');
      return;
    }

    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    anchor.click();

    // Cleanup
    URL.revokeObjectURL(objectUrl);
  }
}
