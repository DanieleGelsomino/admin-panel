import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { User } from '../../models/User';
import { NotifierService } from '../notifier.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  user: User;
  isAdmin = true;
  isLoggedIn = false;
  private signupSubscription!: Subscription;
  private loginSubscription!: Subscription;
  constructor(
    private router: Router,
    private notifierService: NotifierService
  ) {}

  signUp() {
    const signupObservable = new Observable((observer) => {
      let user = [
        {
          nome: 'Daniele',
          cognome: 'Gelso',
          email: 'mimmo@gmm.com',
          password: 'mimmone',
        },
      ];
      setTimeout(() => {
        observer.next(user);
        this.router.navigate(['/utenti']);
      }, 3000);
    });

    this.signupSubscription = signupObservable.subscribe(
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

  login() {
    const loginObservable = new Observable((observer) => {
      let user = [
        {
          email: 'mimmo@gmm.com',
          password: 'mimmone',
        },
      ];
      setTimeout(() => {
        observer.next(user);
        this.isLoggedIn = true;
        this.router.navigate(['/utenti']);
      }, 3000);
    });

    this.loginSubscription = loginObservable.subscribe(
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
    this.signupSubscription.unsubscribe();
  }
}
