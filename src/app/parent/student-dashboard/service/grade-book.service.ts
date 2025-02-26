import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeBookService {

  constructor() { }
  // Using BehaviorSubject to store data and allow components to listen for updates
  private sharedData = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedData.asObservable(); // Expose as an observable for subscribing

  // Method to set the data
  setData(data: any): void {
    this.sharedData.next(data);
  }
}
