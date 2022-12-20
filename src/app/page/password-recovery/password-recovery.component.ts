import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
  recoverypasswordform!: FormGroup;
  isLoading = false;
  isLoggedIn = true;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(recoverypasswordform: NgForm) {
    if (!recoverypasswordform.valid) {
      return;
    }
    this.isLoading = true;
    const newPassword = recoverypasswordform.value.newPassword;
    const confirmNewPassword = recoverypasswordform.value.confirmNewpassword;
    if (newPassword === confirmNewPassword) {
      localStorage.setItem('newPassword', confirmNewPassword);
      this.router.navigate(['/login']);
      recoverypasswordform.reset();
    } else {
      !recoverypasswordform.valid;
    }
  }
}
