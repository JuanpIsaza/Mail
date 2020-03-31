import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  URI: string = environment.URI;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  // Retorna los correos de la bandeja(Inbox).
  // Si se envia el parametro id nos retorna el detalle de ese mensaje.
  getInbox(mail, id?) {
    mail = mail.toLowerCase();
    console.log(mail);
    const compEmail = '@gmail.com';
    this.httpOptions.headers.append('User-Email', `${compEmail}`);
    console.log(this.httpOptions.headers);
    if (id) {
      return this.http.get(`${this.URI}/inbox/${id}`, this.httpOptions);
    } else {
      return this.http.get(`${this.URI}/inbox`);
    }
  }

  // Metodo para enviar un nuevo mensaje.
  postInboxSent(mail, form) {
    mail = mail.toLowerCase();
    console.log(mail);
    const compEmail = '@gmail.com';
    this.httpOptions.headers.append('User-Email', `${compEmail}`);
    return this.http.post(`${this.URI}/inbox/send`, form, this.httpOptions);
  }

  // Metodo para eliminar un mensaje.
  deleteInbox(mail, id) {
    mail = mail.toLowerCase();
    console.log(mail);
    const compEmail = '@gmail.com';
    this.httpOptions.headers.append('User-Email', `${compEmail}`);
    return this.http.delete(`${this.URI}/delete/${id}`, this.httpOptions);
  }

  // Metodo para agregar a fovoritos un mensaje.
  putInboxFavorite(mail, form) {
    mail = mail.toLowerCase();
    console.log(mail);
    const compEmail = '@gmail.com';
    this.httpOptions.headers.append('User-Email', `${compEmail}`);
    return this.http.put(`${this.URI}/inbox/${form.id}`, form, this.httpOptions);
  }

  // Retorna los mensajes que correspondan al correo enviado.
  // Si se envia el parametro id nos retorna el detalle de ese mensaje.
  getSent(mail, id?) {

    mail = mail.toLowerCase();
    console.log(mail);
    const compEmail = '@gmail.com';

    if (id) {
      return this.http.get(`${this.URI}/sent/${mail}${compEmail}/${id}`);
    } else {
      return this.http.get(`${this.URI}/sent/${mail}${compEmail}`);
    }
  }
}
