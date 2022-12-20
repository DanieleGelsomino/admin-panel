import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
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
export class SignUpComponent {
  user: User;
  signupform!: FormGroup;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/utenti']);
    }
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
    this.authService.signUp();
    signupform.reset();
  }
}
