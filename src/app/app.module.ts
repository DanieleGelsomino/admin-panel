import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Componenti
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { UsersComponent } from './page/users/users.component';
import { StoreComponent } from './page/store/store.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotfoundComponent } from './page/notfound/notfound.component';
import { PasswordRecoveryComponent } from './page/password-recovery/password-recovery.component';
import { UserDetailsComponent } from './page/user-details/user-details.component';
import { ProductStoreDetailsComponent } from './page/product-store-details/product-store-details.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { ModalComponent } from './page/store/components/modal/modal.component';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { StoreTableComponent } from './page/store/store-table/store-table.component';
import { AddNewUserComponent } from './page/users/add-new-user/add-new-user.component';
import { UpdateUserComponent } from './page/users/update-user/update-user.component';
import { UsersTableComponent } from './page/users/users-table/users-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    UsersComponent,
    StoreComponent,
    HeaderComponent,
    TableComponent,
    SpinnerComponent,
    NotfoundComponent,
    PasswordRecoveryComponent,
    UserDetailsComponent,
    ProductStoreDetailsComponent,
    NotifierComponent,
    ModalComponent,
    StoreTableComponent,
    AddNewUserComponent,
    UpdateUserComponent,
    UsersTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
