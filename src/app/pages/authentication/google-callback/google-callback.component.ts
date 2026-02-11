import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { TokenHelper } from 'src/app/_common/tokenHelper';
@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent {
  constructor(private auth: AuthService, private router: Router) {}
 ngOnInit() {
    this.auth.processGoogleLogin().subscribe({
      next: (response: any) => {
        debugger
        TokenHelper.setToken(response.data);
        AuthService.SaveUserInfo(response.data);
        AuthService.RedirectUserHome(response.data, this.router);
      },
      error: () => {
        this.router.navigate(['/authentication/login']);
      }
    });
  }

}
