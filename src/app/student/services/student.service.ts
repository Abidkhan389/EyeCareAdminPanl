import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { IStudent } from '../models/student';
import { StudentCreateDto } from '../../apiTypes/studentPostDto';
import { RepoResponse } from '../../apiTypes/RepoResponse';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<IStudent[]>([]);
  private studentEditSubject: BehaviorSubject<StudentCreateDto | null>;
  private apiUrl = 'api/student';

  constructor(private http: HttpClient) {
    this.studentEditSubject = new BehaviorSubject<StudentCreateDto | null>(
      null
    );
  }

  getStudents(): Observable<RepoResponse<IStudent[]>> {
    return this.http
      .get<RepoResponse<IStudent[]>>(this.apiUrl)
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

  getStudentById(id: number): any | undefined {
    const students = this.studentsSubject.getValue();
    return students.find((student) => student.id === id);
  }

  createStudent(
    studentPostDto: StudentCreateDto
  ): Observable<StudentCreateDto> {
    return this.http.post<StudentCreateDto>(this.apiUrl, studentPostDto);
  }
  createStudentHaveAlreadyAccount(
    studentPostDto: any
  ): Observable<any> {
    return this.http.post<any>(this.apiUrl, studentPostDto);
  }
  updateStudentHaveAlreadyAccount(
    studentPostDto: any
  ): Observable<any> {
    return this.http.post<any>(this.apiUrl, studentPostDto);
  }

  updateStudent(
    id: number,
    studentPostDto: any
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      studentPostDto
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
