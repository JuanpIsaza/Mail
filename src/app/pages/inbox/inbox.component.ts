import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail/mail.service';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeletedService } from 'src/app/services/deleted/deleted.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  filterForm: FormGroup;
  getMails$;
  mails;
  mailsCopy;
  msgGetMails = false;
  msgFavoriteMails = false;
  msgDeleteMails = false;
  acumDataMails = [];
  mailsDeleted;

  constructor(
    private mailService: MailService,
    private formBuilder: FormBuilder,
    private deletedService: DeletedService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      data: ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.getMails(this.getLocalstorage());
  }

  onSubmit() {
    this.doFilter(this.filterForm.value);
  }

  doFilter({ data }) {
    if (data) {
      const result = this.mails.filter(item => item.subject === data);
      this.mailsCopy = result;
    }
  }

  resetFilter() {
    this.mailsCopy.push(this.mails);
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
          this.mailsCopy = this.mails;
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
    const id = form.id;

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
        (res: any) => {
          // Pendiente la forma de guardar la informacion que estoy borrando.
          this.deletedService.data$ = form;
          // this.mailsDeleted += form;
          // console.log(this.mailsDeleted);

          this.getMails(this.getLocalstorage());
        },
        error => console.log('error subscribe', error)
      );
  }

  doDeleteMasive() {
    console.log(this.acumDataMails);

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
        (res: any) => {
          // Pendiente la forma de guardar la informacion que estoy borrando.
          this.deletedService.data$ = form;
          // this.mailsDeleted += form;
          // console.log(this.mailsDeleted);

          this.getMails(this.getLocalstorage());
        },
        error => console.log('error subscribe', error)
      );
  }

  acumMails(form, e) {
    console.log(form, e);

    if ( e.target.checked === true) {
      this.acumDataMails.push(form);
    } else {
      this.acumDataMails.filter(form.id).pop();
      const result = this.mails.filter(item => item[`${filter}`] === data);
      this.acumDataMails = result
    }
  }
}
