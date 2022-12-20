import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotifierService } from 'src/app/service/notifier.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements ErrorStateMatcher {
  user: User;
  signupform!: FormGroup;
  isLoading = false;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', Validators.required);
  nameFormControl = new FormControl('', Validators.required);
  lastnameFormControl = new FormControl('', Validators.required);

  matcher = new ErrorStateMatcher();
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/utenti']);
    } else {
      this.notifierService.showNotification(
        'Non sei ancora Registrato!',
        'Ok',
        'error'
      );
    }
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

  onSubmit(signupform: NgForm) {
    if (!signupform.valid) {
      return;
    }
    this.isLoading = true;
    const nome = signupform.value.nome;
    const cognome = signupform.value.cognome;
    const email = signupform.value.email;
    const password = signupform.value.password;
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    this.authService.signUp();
    signupform.reset();
  }
}
