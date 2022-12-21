import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { NotifierService } from '../notifier.service';
import { FormGroup, NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  user: User;
  isAdmin = true;
  isLoggedIn = false;
  signupform: FormGroup;
  loginform: FormGroup;
  private authSubscription!: Subscription;
  constructor(
    private router: Router,
    private notifierService: NotifierService
  ) {}

  signUp(signupform: NgForm) {
    const nome = signupform.value.nome;
    const cognome = signupform.value.cognome;
    const email = signupform.value.email;
    const password = signupform.value.password;
    const signupObservable = new Observable((observer) => {
      this.user = new User(nome, cognome, email, password);
      setTimeout(() => {
        observer.next(this.user);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        this.router.navigate(['/utenti']);
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
      // const nome = loginform.value.nome;
      // const cognome = loginform.value.cognome;
      const email = loginform.value.email;
      const password = loginform.value.password;
      this.user = new User('', '', email, password);
      setTimeout(() => {
        observer.next(this.user);
        this.isLoggedIn = true;
        this.router.navigate(['/utenti']);
      }, 3000);
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
    this.router.navigate(['/home']);
    this.isLoggedIn;
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
