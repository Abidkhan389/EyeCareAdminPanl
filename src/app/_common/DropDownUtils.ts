import { Observable, catchError, of } from "rxjs";
import { IdoctorDto } from "./_interfaces/doctor/IdoctorDto";
import { LookUpService } from "./_services/look-up.service";
import { showErrorMessage } from "./messages";

export class DropDownUtils{
    constructor(protected lookUpService: LookUpService,){}
   
  /**
   * Returns an Observable of doctors
   * Automatically shows error messages if API fails
   */
  protected getAllDoctorDDL(): Observable<IdoctorDto[]> {
    return this.lookUpService.getAllDoctors().pipe(
      catchError(err => {
        // show error and return empty array to keep stream alive
        showErrorMessage(err.message || "Failed to fetch doctors");
        return of([] as IdoctorDto[]);
      })
    );
  }
}