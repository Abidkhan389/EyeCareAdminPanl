import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppDateService {
  constructor() {}

  getDateOnly(date: Date): string {
    let monthInt = date.getMonth() + 1;
    const month = monthInt < 10 ? `0${monthInt}` : `${monthInt}`;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${month}/${day}/${date.getFullYear()}`;
  }
}
