import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginform!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginform: NgForm) {
    if (!loginform.valid) {
      return;
    }
    const email = loginform.value.email;
    const password = loginform.value.password;
    localStorage.setItem('email', email);
    // console.log('email:' + email, 'password:' + password);
    this.authService.login();

    loginform.reset();
  }

  onLogout() {
    this.authService.logout();
  }
}
