import { Injectable } from '@angular/core';
import { RepoResponse } from '../../apiTypes/RepoResponse';
import {
  Invoice,
  InvoiceDto,
  InvoiceItem,
  PayIn,
  PayOut,
  SalaryPayments,
  StudentPayments,
} from '../../apiTypes/ApiTypes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { StudentAccount } from '../../apiTypes/studentaccount';
import { AlertService } from '../../shared/services/alert.service';
import { ALERT_TYPE } from '../../shared/models/alert';
import { IncomeType } from '../../apiTypes/incomeType';

@Injectable({
  providedIn: 'root',
})
export class FinancialOperationsService {
  private apiUrl = 'api/FinancialOperations';

  private singleStudentPayment = new BehaviorSubject<StudentPayments | null>(
    null
  );
  private studentPaymentsSubject = new BehaviorSubject<StudentPayments[]>([]);
  private studentPaymentsFilterSubject = new BehaviorSubject<StudentPayments[]>(
    []
  );
  private studentAccountDetailsSubject =
    new BehaviorSubject<StudentAccount | null>(null);
  InvoicesSubject = new BehaviorSubject<Invoice[] | null>([]);
  InvoiceDetailsSubject = new BehaviorSubject<InvoiceDto | null>(null);
  PayInSubject = new BehaviorSubject<PayIn[] | null>([]);
  payInDetails = new BehaviorSubject<PayIn | null>(null);
  IncomeTypesSubject = new BehaviorSubject<IncomeType[] | null>(null);
  constructor(
    private readonly http: HttpClient,
    private readonly alertService: AlertService
  ) {}

  getStudentPayments(
    accountId: number
  ): Observable<RepoResponse<StudentPayments[]>> {
    return this.http
      .get<RepoResponse<StudentPayments[]>>(
        `${this.apiUrl}/StudentPayments/${accountId}`
      )
      .pipe(tap((response) => this.studentPaymentsSubject.next(response.data)))
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  getSingleStudentPayment(
    paymentId: number
  ): Observable<RepoResponse<StudentPayments>> {
    return this.http
      .get<RepoResponse<StudentPayments>>(
        `${this.apiUrl}/StudentPayment/${paymentId}`
      )
      .pipe(tap((response) => this.singleStudentPayment.next(response.data)))
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }
  getStudentAccount(
    studentId: number
  ): Observable<RepoResponse<StudentAccount>> {
    return this.http
      .get<RepoResponse<StudentAccount>>(
        `${this.apiUrl}/GetStudentAccountDetails/${studentId}`
      )
      .pipe(
        tap((response) => this.studentAccountDetailsSubject.next(response.data))
      )
      .pipe(
        catchError((e) => {
          return this.handleError(e, this.alertService);
        })
      );
  }

  filterStudentPayments(
    studentId: number,
    startDate: string | null | undefined,
    endDate: string | null | undefined
  ): Observable<RepoResponse<StudentPayments[]>> {
    return this.http
      .get<RepoResponse<StudentPayments[]>>(
        `${this.apiUrl}/StudentPayments/${studentId}/${startDate}/${endDate}`
      )
      .pipe(
        tap((response) => this.studentPaymentsFilterSubject.next(response.data))
      )
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  postStudentPayment(
    studentPostDto: StudentPayments
  ): Observable<RepoResponse<StudentPayments>> {
    return this.http
      .post<RepoResponse<StudentPayments>>(
        `${this.apiUrl}/MakeStudentPayment`,
        studentPostDto
      )
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  private handleError(error: HttpErrorResponse, alertService: AlertService) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend or server-side error
      errorMessage = `Something went wrong, please try again later! If issue persists, please contact admin.`;
    }
    alertService.alert(errorMessage, ALERT_TYPE.ERROR);
    // Return an observable with a user-facing error message
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }

  getInvoices(): Observable<RepoResponse<Invoice[]>> {
    return this.http
      .get<RepoResponse<Invoice[]>>(`${this.apiUrl}/Invoices`)
      .pipe(tap((response) => this.InvoicesSubject.next(response.data)))
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  getPayIns(): Observable<RepoResponse<PayIn[]>> {
    return this.http
      .get<RepoResponse<PayIn[]>>(`${this.apiUrl}/PayIns`)
      .pipe(tap((response) => this.PayInSubject.next(response.data)))
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  getInvoiceDetails(invoiceId: number): Observable<RepoResponse<InvoiceDto>> {
    return this.http
      .get<RepoResponse<InvoiceDto>>(
        `${this.apiUrl}/GetInvoiceDetails/${invoiceId}`
      )
      .pipe(tap((response) => this.InvoiceDetailsSubject.next(response.data)))
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  getPayInDetails(invoiceId: number): Observable<RepoResponse<PayIn>> {
    return this.http
      .get<RepoResponse<PayIn>>(`${this.apiUrl}/GetPayInDetails/${invoiceId}`)
      .pipe(tap((response) => this.payInDetails.next(response.data)))
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  getIncomeTypes(): Observable<RepoResponse<IncomeType[]>> {
    return this.http
      .get<RepoResponse<IncomeType[]>>(`${this.apiUrl}/IncomeTypes`)
      .pipe(tap((response) => this.IncomeTypesSubject.next(response.data)))
      .pipe(catchError((e) => this.handleError(e, this.alertService)));
  }

  updateInvoice(invoiceDto: InvoiceDto): Observable<RepoResponse<boolean>> {
    // Check if at least one invoice item is provided
    if (!invoiceDto.invoiceItems || invoiceDto.invoiceItems.length === 0) {
      // Alert and throw error
      this.alertService.alert(
        'At least one InvoiceItem is required',
        ALERT_TYPE.ERROR
      );
      throw new Error('At least one InvoiceItem is required.');
    }

    // Determine the appropriate API endpoint based on whether a payout is provided
    const endpoint = `${this.apiUrl}/updateInvoice`;

    // Call the correct API based on whether payout is provided
    return this.http.post<RepoResponse<boolean>>(endpoint, invoiceDto).pipe(
      catchError((error) => {
        // Handle API error and alert
        this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
        throw new Error(error);
      })
    );
  }

  deletePayIn(payInId: any): Observable<RepoResponse<boolean>> {
    // Determine the appropriate API endpoint based on whether a payout is provided
    const endpoint = `${this.apiUrl}/deletePayIn?payInId=${payInId}`;

    // Call the correct API based on whether payout is provided
    return this.http.delete<RepoResponse<boolean>>(endpoint).pipe(
      catchError((error) => {
        // Handle API error and alert
        this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
        throw new Error(error);
      })
    );
  }

  deleteInvoice(invoiceId: number): Observable<RepoResponse<boolean>> {
    // Determine the appropriate API endpoint based on whether a payout is provided
    const endpoint = `${this.apiUrl}/deleteInvoice?invoiceId=${invoiceId}`;

    // Call the correct API based on whether payout is provided
    return this.http.delete<RepoResponse<boolean>>(endpoint).pipe(
      catchError((error) => {
        // Handle API error and alert
        this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
        throw new Error(error);
      })
    );
  }

  createPayIn(payIn: PayIn) {
    const endpoint = `${this.apiUrl}/createPayIn`;

    // Call the correct API based on whether payout is provided
    return this.http.post<RepoResponse<boolean>>(endpoint, payIn).pipe(
      catchError((error) => {
        // Handle API error and alert
        this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
        throw new Error(error);
      })
    );
  }

  createSalaryPayment(salaryPayment: SalaryPayments) {
    const endpoint = `${this.apiUrl}/createSalaryPayment`;
    if (!salaryPayment.salaryPaymentsId) salaryPayment.salaryPaymentsId = 0;
    // Call the correct API based on whether payout is provided
    return this.http.post<RepoResponse<boolean>>(endpoint, salaryPayment).pipe(
      catchError((error) => {
        // Handle API error and alert
        this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
        throw new Error(error);
      })
    );
  }

  editPayIn(payIn: PayIn) {
    const endpoint = `${this.apiUrl}/UpatePayIn`;

    // Call the correct API based on whether payout is provided
    return this.http.post<RepoResponse<boolean>>(endpoint, payIn).pipe(
      catchError((error) => {
        // Handle API error and alert
        this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
        throw new Error(error);
      })
    );
  }

  createNewInvoice(invoiceDto: InvoiceDto): Observable<RepoResponse<boolean>> {
    // Check if at least one invoice item is provided
    if (!invoiceDto.invoiceItems || invoiceDto.invoiceItems.length === 0) {
      // Alert and throw error
      this.alertService.alert(
        'At least one InvoiceItem is required',
        ALERT_TYPE.ERROR
      );
      throw new Error('At least one InvoiceItem is required.');
    }

    // Determine the appropriate API endpoint based on whether a payout is provided
    const endpoint = `${this.apiUrl}/createInvoice`;

    // Call the correct API based on whether payout is provided
    return this.http.post<RepoResponse<boolean>>(endpoint, invoiceDto).pipe(
      catchError((error) => {
        // Handle API error and alert
        this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
        throw new Error(error);
      })
    );
  }

  // Method to pay an invoice, taking payout object and invoiceId
  payInvoiceMethod(payout: PayOut): Observable<RepoResponse<boolean>> {
    // Call the API to process the payment
    return this.http
      .post<RepoResponse<boolean>>(`${this.apiUrl}/payInvoice`, payout)
      .pipe(
        catchError((error) => {
          // Handle API error and alert
          this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
          throw new Error(error);
        })
      );
  }
  getPayHistory(
    employeeId: number
  ): Observable<RepoResponse<SalaryPayments[]>> {
    return this.http
      .get<RepoResponse<SalaryPayments[]>>(
        `${this.apiUrl}/payHistory/${employeeId}`
      )
      .pipe(
        catchError((error) => {
          // Handle API error and alert
          this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
          throw new Error(error);
        })
      );
  }
 
  GetPaymentByIdAsync(id: number): Observable<any> {
    return this.http.get<any>( `${this.apiUrl}/paymentById/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching classroom:', error);
        throw error;
      })
    );
  }

  getTaxesAndSsnDeductions(employeeId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/taxesAndSsnAndDeductions/${employeeId}`)
      .pipe(
        catchError((error) => {
          // Handle API error and alert
          this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
          throw new Error(error);
        })
      );
  }

  getEmployeeBenefits(employeeId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/employeeBenefits/${employeeId}`)
      .pipe(
        catchError((error) => {
          // Handle API error and alert
          this.alertService.alert('Something went wrong', ALERT_TYPE.ERROR);
          throw new Error(error);
        })
      );
  }
  deleteSalaryPayments(ids: any): Observable<boolean> {
    return this.http.post<boolean>(
      this.apiUrl + '/Delete',
      Array.isArray(ids) ? ids : [ids]
    );
  }
}
