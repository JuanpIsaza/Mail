import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URI: string = environment.URI;

  constructor(private http: HttpClient) { }

  postUser(form) {
    return this.http.post(`${this.URI}/login`, form);
  }
  postNewUser(form) {
    return this.http.post(`${this.URI}/login/newUser`, form);
  }

}
