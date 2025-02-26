import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss',
})
export class RouteComponent {
  title = new BehaviorSubject<string>('Routes');

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      if (data['title']) {
        this.title.next(data['title']); // Dynamically update title from route data
      }
    });
  }
}
