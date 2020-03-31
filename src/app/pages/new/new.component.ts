import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MailService } from 'src/app/services/mail/mail.service';
import { catchError } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  newForm: FormGroup;
  postMails$;

  constructor(
    private formBuilder: FormBuilder,
    private mailService: MailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.maxLength(50)]],
      // receiver: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      receiver: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    const userData = localStorage.getItem('datos');

    this.newInbox(JSON.parse(userData), this.newForm.value);
  }

  newInbox({ user }, form) {
    user = user.toLowerCase();
    form.sender = `${user}@gmail.com`;

    this.postMails$ = this.mailService
      .postInboxSent(user, form)
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
          this.router.navigate(['../inbox']);
        },
        error => console.log('error subscribe', error)
      );
  }
}
