import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotifierService } from '../../service/notifier.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginform!: FormGroup;
  hide = true;

  constructor(
    public authService: AuthService,
    private notifierService: NotifierService
  ) {
    if (!localStorage.getItem('email')) {
      this.notifierService.showNotification(
        "Non hai ancora effettuato l'accesso",
        'Ok',
        'error'
      );
    }
  }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(loginform: NgForm) {
    if (!loginform.valid) {
      return;
    }
    this.authService.login(loginform);
    // if (this.authService.isLoggedIn == true) {
    //   this.isLoading = true;
    //   this.authService.login(loginform);
    //   loginform.reset();
    // }
  }

  onLogout() {
    this.authService.logout();
  }
}
