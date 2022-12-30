import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/service/notifier.service';
import { UsersService } from 'src/app/service/users.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { observable } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  usersForm!: FormGroup;
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
    this.usersForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      eta: ['', Validators.required],
      email: ['', Validators.required],
      indirizzo: ['', Validators.required],
    });

    this.usersService
      .getUserJSONById(parseInt(this.route.snapshot.paramMap.get('id')!))
      .subscribe((result) => {
        this.usersForm = this.formBuilder.group({
          id: [result['id'], Validators.required],
          nome: [result['nome'], Validators.required],
          cognome: [result['cognome'], Validators.required],
          eta: [result['eta'], Validators.required],
          email: [result['email'], Validators.required],
          indirizzo: [result['indirizzo'], Validators.required],
        });
      });
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
