import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isAdmin = true;
  isLoggedIn = false;
  private signupSubscription!: Subscription;
  constructor(private router: Router) {}

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

    this.signupSubscription = signupObservable.subscribe((data) => {
      console.log(data);
    });
  }

  login() {
    this.router.navigate(['/utenti']);
    this.isLoggedIn = true;
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
