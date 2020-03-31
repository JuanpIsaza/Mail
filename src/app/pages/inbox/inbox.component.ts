import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail/mail.service';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  getMails$;
  mails;
  msgGetMails = false;
  msgFavoriteMails = false;
  msgDeleteMails = false;
  mailsDeleted;

  constructor(private mailService: MailService) {}

  ngOnInit(): void {
    this.getMails(this.getLocalstorage());
  }

  getLocalstorage() {
    const userData = JSON.parse(localStorage.getItem('datos'));
    return userData.user;
  }

  getMails(user) {
    this.getMails$ = this.mailService
      .getInbox(user)
      .pipe(
        catchError(error => {
          let errorMessage = '';
          if (error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Client-side error: ${error.error.message}`;
          } else {
            // backend error
            errorMessage = `Server-side error: ${error.status} ${error.message}`;
          }

          // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
          this.msgGetMails = true;
          // this.errorService.show(errorMessage);
          console.log('error message', errorMessage);
          return throwError(errorMessage);
        })
      )
      .subscribe(
        res => {
          this.mails = res;
        },
        error => console.log('error subscribe', error)
      );
  }

  doFavorite(form) {
    this.getMails$ = this.mailService
      .putInboxFavorite(this.getLocalstorage(), form)
      .pipe(
        catchError(error => {
          let errorMessage = '';
          if (error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Client-side error: ${error.error.message}`;
          } else {
            // backend error
            errorMessage = `Server-side error: ${error.status} ${error.message}`;
          }

          // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
          this.msgFavoriteMails = true;
          // this.errorService.show(errorMessage);
          console.log('error message', errorMessage);
          return throwError(errorMessage);
        })
      )
      .subscribe(
        res => {
          this.getMails(this.getLocalstorage());
        },
        error => console.log('error subscribe', error)
      );
  }
  doDelete(form) {
    console.log(form);

    this.getMails$ = this.mailService
      .deleteInbox(this.getLocalstorage(), form)
      .pipe(
        catchError(error => {
          let errorMessage = '';
          if (error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Client-side error: ${error.error.message}`;
          } else {
            // backend error
            errorMessage = `Server-side error: ${error.status} ${error.message}`;
          }

          // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
          this.msgDeleteMails = true;
          // this.errorService.show(errorMessage);
          console.log('error message', errorMessage);
          return throwError(errorMessage);
        })
      )
      .subscribe(
        res => {
          // Pendiente la forma de guardar la informacion que estoy borrando.
          this.mailsDeleted += form;
          console.log(this.mailsDeleted);

          this.getMails(this.getLocalstorage());
        },
        error => console.log('error subscribe', error)
      );
  }
}
