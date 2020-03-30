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

  constructor(private mailService: MailService) {}

  ngOnInit(): void {
    this.getMails();
  }

  getMails() {
    this.getMails$ = this.mailService
      .getInbox()
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
          // this.errorService.show(errorMessage);
          console.log('error message', errorMessage);
          return throwError(errorMessage);
        })
      )
      .subscribe(
        res => {
          console.log(res);
          this.mails = res;
        },
        error => console.log('error subscribe', error)
      );
  }
}
