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
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginform: NgForm) {
    if (!loginform.valid) {
      return;
    }
    this.isLoading = true;
    const email = loginform.value.email;
    const password = loginform.value.password;
    localStorage.setItem('email', email);
    this.authService.login();

    loginform.reset();
  }

  onLogout() {
    this.authService.logout();
  }
}
