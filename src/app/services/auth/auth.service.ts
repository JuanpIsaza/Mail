import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URI: string = environment.URI;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  postUser(form) {
    return this.http.post(`${this.URI}/login`, form, this.httpOptions);
  }
  postNewUser(form) {
    return this.http.post(`${this.URI}/login/newUser`, form, this.httpOptions);
  }
}
