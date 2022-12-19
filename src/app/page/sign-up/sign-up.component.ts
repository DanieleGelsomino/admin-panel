import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signinform!: FormGroup;
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/utenti']);
    }
  }

  onSubmit(signupform: NgForm) {
    if (!signupform.valid) {
      return;
    }
    this.isLoading = true;
    const name = signupform.value.nome;
    const surname = signupform.value.cognome;
    const email = signupform.value.email;
    const password = signupform.value.password;
    localStorage.setItem('email', email);
    this.authService.signUp();
    signupform.reset();
  }
}
