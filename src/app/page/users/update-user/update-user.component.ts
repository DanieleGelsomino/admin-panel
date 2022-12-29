import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/service/notifier.service';
import { UsersService } from 'src/app/service/users.service';
import { BehaviorSubject } from 'rxjs';
import { observable } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  usersForm!: FormGroup;
  userSelected: any = undefined;
  constructor(
    private formBuilder: FormBuilder,
    public usersService: UsersService,
    private notifierService: NotifierService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    localStorage.getItem('result-data-users');
  }

  ngOnInit() {
    this.usersService.currentUser.subscribe((user) => {
      return (this.userSelected = user);
    });
    console.log(this.userSelected);
    if (this.userSelected) {
      this.usersForm = this.formBuilder.group({
        id: [this.userSelected.id, Validators.required],
        nome: [this.userSelected.nome, Validators.required],
        cognome: [this.userSelected.cognome, Validators.required],
        eta: [this.userSelected.eta, Validators.required],
        email: [this.userSelected.email, Validators.required],
        indirizzo: [this.userSelected.indirizzo, Validators.required],
      });
    }
  }
  updateUser() {
    this.usersService
      .updateUser(this.usersForm.value.id, this.usersForm.value)
      .subscribe({
        next: (res) => {
          this.notifierService.showNotification(
            'Modifica effettuata con successo',
            'ok',
            'success'
          );
          this.router.navigate(['/utenti']);
        },
        error: (err) => {
          this.notifierService.showNotification(
            'Riprova, modifica non salvata',
            'ok',
            'error'
          );
        },
      });
  }
}
