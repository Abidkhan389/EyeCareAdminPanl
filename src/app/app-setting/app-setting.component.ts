import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrl: './app-setting.component.scss'
})
export class AppSettingComponent {
  title = new BehaviorSubject<string>('AppSetting');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['title']) {
        this.title.next(data['title']); // Dynamically update title from route data
      }
    });
  }
}
