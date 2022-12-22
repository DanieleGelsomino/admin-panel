import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { StoreComponent } from './page/store/store.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { LoginComponent } from './page/login/login.component';
import { PasswordRecoveryComponent } from './page/password-recovery/password-recovery.component';
import { AuthGuard } from './service/auth/auth.guard';
import { RoleGuardGuard } from './service/auth/role-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrati', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recupera-password', component: PasswordRecoveryComponent },
  {
    path: 'utenti',
    component: UsersComponent,
    canActivate: [AuthGuard, RoleGuardGuard],
    canActivateChild: [AuthGuard],
    data: {
      role: ['Admin'],
    },
  },
  { path: 'utenti/:id', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'store',
    component: StoreComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  { path: 'store/:id', component: StoreComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
