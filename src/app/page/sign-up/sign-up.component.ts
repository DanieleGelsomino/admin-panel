import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signinform!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/utenti']);
    }
  }

  onSubmit(signinform: NgForm) {
    if (!signinform.valid) {
      return;
    }
    const name = signinform.value.nome;
    const surname = signinform.value.cognome;
    const email = signinform.value.email;
    const password = signinform.value.password;
    localStorage.setItem('email', email);

    // console.log(
    //   'nome:' + name,
    //   'cognome:' + surname,
    //   'email:' + email,
    //   'password:' + password
    // );
    this.authService.signIn();
    signinform.reset();
  }
}
