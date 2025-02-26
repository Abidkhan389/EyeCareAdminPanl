import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // BehaviorSubject to track loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  // Show the spinner
  show() {
    this.loadingSubject.next(true);
  }

  // Hide the spinner
  hide() {
    this.loadingSubject.next(false);
  }
}
