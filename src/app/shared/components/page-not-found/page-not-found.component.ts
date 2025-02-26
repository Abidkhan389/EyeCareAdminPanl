import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit {
  status!: number;
  message!: string;
  private sub!: Subscription;

  constructor(public activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.sub = this.activatedRoute.queryParams.subscribe((params) => {
      this.status = params['status'] ? +params['status'] : 404;
      this.message = params['message'] ? params['message'] : 'Page not found!';
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  redirectToHome() {
    this.router.navigate(['/'], { relativeTo: this.activatedRoute });
  }

  //TODO: Move this to auth service
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
