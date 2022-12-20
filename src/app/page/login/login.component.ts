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
export class LoginComponent implements ErrorStateMatcher {
  loginform!: FormGroup;
  isLoading = false;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', Validators.required);

  matcher = new ErrorStateMatcher();

  constructor(
    private authService: AuthService,
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

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }

  onSubmit(loginform: NgForm) {
    if (!loginform.valid) {
      return;
    }

    const email = loginform.value.email;
    const password = loginform.value.password;
    if (email !== localStorage.getItem('email')) {
      this.notifierService.showNotification(
        "l'utente inserito non è presente. Registrati per poter continuare",
        'ok',
        'error'
      );
      !loginform.valid;
    } else {
      this.isLoading = true;
      localStorage.setItem('email', email);
      this.authService.login();
      loginform.reset();
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
