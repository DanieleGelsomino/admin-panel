import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../components/notifier/notifier.component';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(
    message: string,
    action: string,
    messageType: 'error' | 'success'
  ) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        action: action,
        type: messageType,
      },
      // duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: messageType,
    });
  }
}
