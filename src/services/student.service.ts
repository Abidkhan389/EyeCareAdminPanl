import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { RepoResponse } from '../app/apiTypes/RepoResponse';
import { Student } from '../app/apiTypes/student';
import { StudentCreateDto } from '../app/apiTypes/studentPostDto';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private studentEditSubject: BehaviorSubject<StudentCreateDto | null>;
  private apiUrl = 'api/student';

  constructor(private http: HttpClient) {
    this.studentEditSubject = new BehaviorSubject<StudentCreateDto | null>(
      null
    );
  }

  getStudents(): Observable<RepoResponse<Student[]>> {
    return this.http
      .get<RepoResponse<Student[]>>(this.apiUrl)
      .pipe(tap((response) => this.studentsSubject.next(response.data)));
  }

  getStudentForEdit(
    studentId: number
  ): Observable<RepoResponse<StudentCreateDto>> {
    return this.http
      .get<RepoResponse<StudentCreateDto>>(
        `${this.apiUrl}/GetSudentByDetail/${studentId}`
      )
      .pipe(tap((response) => this.studentEditSubject.next(response.data)));
  }

  getStudentById(id: number): Student | undefined {
    const students = this.studentsSubject.getValue();
    return students.find((student) => student.id === id);
  }

  createStudent(
    studentPostDto: StudentCreateDto
  ): Observable<StudentCreateDto> {
    return this.http.post<StudentCreateDto>(this.apiUrl, studentPostDto);
  }

  updateStudent(
    id: number,
    studentPostDto: StudentCreateDto
  ): Observable<StudentCreateDto> {
    return this.http.put<StudentCreateDto>(
      `${this.apiUrl}/${id}`,
      studentPostDto
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllStudentForDropDown(): Observable<RepoResponse<any[]>> {
    return this.http.get<RepoResponse<any[]>>(
      `${this.apiUrl}/GetAllStudentsForDropDown`
    );
  }
}
