import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  doLogin$;
  msgLogin = false;
  routeRegister = '/register';
  textbtn = 'Registrar';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.doLogin(this.loginForm.value);
  }

  doLogin(form) {
    this.doLogin$ = this.authService
      .postUser(form)
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
          this.msgLogin = true;
          // this.errorService.show(errorMessage);
          console.log('error message', errorMessage);
          return throwError(errorMessage);
        })
      )
      .subscribe(
        res => {
          localStorage.setItem('datos', JSON.stringify(res));
          this.router.navigate(['../inbox']);
        },
        error => console.log('error subscribe', error)
      );
  }
}
