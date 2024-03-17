import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  username: string | undefined = '';

  constructor(private router: Router) {
    localStorage.removeItem('username');
  }

  onSubmit() {
    if (this.username) {
      localStorage.setItem('username', this.username);
      this.router.navigateByUrl('/chart');
    }
  }
}
