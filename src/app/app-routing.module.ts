import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { StoreComponent } from './page/store/store.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { LoginComponent } from './page/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrati', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'utenti', component: UsersComponent },
  { path: 'utenti/:id', component: UsersComponent },
  { path: 'store', component: StoreComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
