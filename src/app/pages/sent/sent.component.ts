import { Component, OnInit } from '@angular/core';
import { MailService } from 'src/app/services/mail/mail.service';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit {
  filterForm: FormGroup;
  getMails$;
  msgSent = false;
  mails;
  paramsFilter = ['Asunto', 'Destinatario', 'Descripcion'];

  constructor(
    private mailService: MailService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      data: ['', [Validators.required, Validators.maxLength(50)]],
      filter: ['', Validators.required]
    });
    const userData = localStorage.getItem('datos');
    this.getMails(JSON.parse(userData));
  }

  onSubmit() {
    this.doFilter(this.filterForm.value);
  }

  doFilter({ data, filter }) {
    if (data && filter) {
      if (filter === 'Asunto') {
        filter = 'subject';
      }
      if (filter === 'Destinatario') {
        filter = 'receiver';
      }
      if (filter === 'Descripcion') {
        filter = 'description';
      }
      console.log(filter);

      console.log(data);
      const result = this.mails.filter(item => item[`${filter}`] === data);
      console.log(result);
      this.mails = result;
    }
  }

  getMails({ user }) {
    this.getMails$ = this.mailService
      .getSent(user)
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
          this.msgSent = true;
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
}
