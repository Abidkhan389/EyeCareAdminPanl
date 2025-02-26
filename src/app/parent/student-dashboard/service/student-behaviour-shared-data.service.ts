import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Singleton service available throughout the app
})
export class STudentBehaviourSharedDataService {
  constructor() {}

  // BehaviorSubject to store and share data across components
  private sharedData = new BehaviorSubject<any>(null);

  // Expose the BehaviorSubject as an Observable for external subscription
  sharedData$ = this.sharedData.asObservable();

  // Method to update the shared data
  setData(data: any): void {
    this.sharedData.next(data); // Update the BehaviorSubject with new data
  }
}
