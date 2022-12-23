import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NotifierService } from '../../service/notifier.service';
import { Router } from '@angular/router';

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
    private notifierService: NotifierService,
    private router: Router
  ) {
    if (!localStorage.getItem('email')) {
      this.notifierService.showNotification(
        "Non hai ancora effettuato l'accesso",
        'Ok',
        'error'
      );
    } else {
      this.router.navigate(['/store']);
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
  }

  onLogout() {
    this.authService.logout();
  }
}
