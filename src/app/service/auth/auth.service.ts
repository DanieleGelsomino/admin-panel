import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { NotifierService } from '../notifier.service';
import { FormGroup, NgForm } from '@angular/forms';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  user: User;
  isAdmin = true;
  isLoggedIn = false;
  isLoading = false;
  signupform: FormGroup;
  loginform: FormGroup;
  private authSubscription!: Subscription;
  constructor(
    private router: Router,
    private notifierService: NotifierService,
    public usersService: UsersService
  ) {}

  signUp(signupform: NgForm) {
    const nome = signupform.value.nome;
    const cognome = signupform.value.cognome;
    const email = signupform.value.email;
    const password = signupform.value.password;
    const signupObservable = new Observable((observer) => {
      this.user = new User(nome, cognome, email, password, 'User');
      setTimeout(() => {
        observer.next(this.user);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('role', 'User');
        this.router.navigate(['/store']);
      }, 3000);
    });

    this.authSubscription = signupObservable.subscribe(
      (data) => {
        this.notifierService.showNotification(
          'Registrazione avvenuta con successo!',
          'Ok',
          'success'
        );
        console.log(data);
      },
      (error) => {
        this.notifierService.showNotification(
          'Registrazione fallita',
          'ok',
          'error'
        );
        console.log(error);
      }
    );
  }

  login(loginform: NgForm) {
    const loginObservable = new Observable((observer) => {
      const email = loginform.value.email;
      const password = loginform.value.password;
      this.usersService.allUser.forEach((user) => {
        if (user.email == email && user.password == password) {
          this.isLoading = true;
          this.isLoggedIn = true;
          setTimeout(() => {
            observer.next(this.user);
            localStorage.setItem('email', user.email);
            localStorage.setItem('password', user.password);
            localStorage.setItem('role', user.role);
            if (user.role == 'Admin') {
              this.router.navigate(['/utenti']);
            } else {
              this.router.navigate(['/store']);
            }
          }, 3000);
        }
      });
      if (!this.isLoggedIn) {
        this.notifierService.showNotification(
          'Utente non trovato',
          'ok',
          'error'
        );
      }
    });

    this.authSubscription = loginObservable.subscribe(
      (data) => {
        this.notifierService.showNotification(
          'Login effettuato!',
          'Ok',
          'success'
        );
        console.log(data);
      },
      (error) => {
        this.notifierService.showNotification('Login fallito', 'ok', 'error');
        console.log(error);
      }
    );
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.isLoading = false;
    this.router.navigate(['/home']);
  }

  isRoleAdmin() {
    return this.isAdmin;
  }

  isLogged() {
    return this.isLoggedIn;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
