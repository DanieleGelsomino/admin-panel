import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../service/users.service';
import { NotifierService } from '../../../service/notifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss'],
})
export class AddNewUserComponent implements OnInit {
  usersForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private notifierService: NotifierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      eta: ['', Validators.required],
      email: ['', Validators.required],
      indirizzo: ['', Validators.required],
    });

    this.usersForm.controls['id'].setValue(this.usersForm.value.id);
    this.usersForm.controls['nome'].setValue(this.usersForm.value.nome);
    this.usersForm.controls['cognome'].setValue(this.usersForm.value.cognome);
    this.usersForm.controls['eta'].setValue(this.usersForm.value.eta);
    this.usersForm.controls['email'].setValue(this.usersForm.value.email);
    this.usersForm.controls['indirizzo'].setValue(
      this.usersForm.value.indirizzo
    );
  }

  addUser() {
    if (this.usersForm.valid) {
      this.usersService.addUser(this.usersForm.value).subscribe({
        next: (res) => {
          this.notifierService.showNotification(
            'Aggiunto correttamente',
            'ok',
            'success'
          );
          this.router.navigate(['/utenti']);
          this.usersForm.reset();
        },
        error: (err) => {
          this.notifierService.showNotification('Riprova', 'ok', 'error');
        },
      });
    }
    // console.log(this.usersForm.value);
    this.usersService.getUsersJSON();
    this.usersForm.reset();
  }
}
