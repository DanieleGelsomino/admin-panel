import { Component, Inject, OnInit } from '@angular/core';
import products from '../../../../../assets/data/products.json';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StoreService } from '../../../../service/store.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from '../../../../service/notifier.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  products: any = products;
  productsForm!: FormGroup;
  actionBtn: string = 'Salva';
  categoryOption: string[] = [
    'Casa & Giardino',
    'TV & Audio',
    'Moda',
    'Fitness',
    'Smarthphone',
  ];
  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private notifierService: NotifierService,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      id: ['', Validators.required],
      titolo: ['', Validators.required],
      prezzo: ['', Validators.required],
      categoria: ['', Validators.required],
      n_pezzi: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Modifica';
      this.productsForm.controls['id'].setValue(this.editData.id);
      this.productsForm.controls['titolo'].setValue(this.editData.titolo);
      this.productsForm.controls['prezzo'].setValue(this.editData.prezzo);
      this.productsForm.controls['categoria'].setValue(this.editData.categoria);
      this.productsForm.controls['n_pezzi'].setValue(this.editData.n_pezzi);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productsForm.valid) {
        this.storeService.addProduct(this.productsForm.value).subscribe({
          next: (res) => {
            this.notifierService.showNotification(
              'Aggiunto correttamente',
              'ok',
              'success'
            );
            this.productsForm.reset();
            this.dialogRef.close('Salva');
          },
          error: (err) => {
            this.notifierService.showNotification('Riprova', 'ok', 'error');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.storeService
      .updateProduct(this.editData.id, this.productsForm.value)
      .subscribe({
        next: (res) => {
          this.notifierService.showNotification(
            'Modifica effettuata con successo',
            'ok',
            'success'
          );
          this.dialogRef.close('Modifica');
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
