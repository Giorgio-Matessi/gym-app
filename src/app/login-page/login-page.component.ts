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

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  checkoutForm = this.formBuilder.group({
    username: '',
  });

  onSubmit() {
    if (this.checkoutForm.value.username) {
      localStorage.setItem('username', this.checkoutForm.value.username);
      this.router.navigateByUrl('/chart');
    }
  }
}
