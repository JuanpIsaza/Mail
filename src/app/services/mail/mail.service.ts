import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  URI: string = environment.URI;

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  httpOptions = {
    headers: new HttpHeaders()
  };

  // Retorna los correos de la bandeja(Inbox).
  // Si se envia el parametro id nos retorna el detalle de ese mensaje.
  getInbox(mail, id?) {
    mail = mail.toLowerCase();
    const compEmail = '@gmail.com';
    const headers = this.headers.append('User-Email', `${mail}${compEmail}`);
    if (id) {
      return this.http.get(`${this.URI}/inbox/${id}`, { headers });
    } else {
      return this.http.get(`${this.URI}/inbox`, { headers });
    }
  }

  // Metodo para enviar un nuevo mensaje.
  postInboxSent(mail, form) {
    mail = mail.toLowerCase();
    const compEmail = '@gmail.com';
    const headers = this.headers.append('User-Email', `${mail}${compEmail}`);
    return this.http.post(`${this.URI}/inbox/send`, form, { headers });
  }

  // Metodo para eliminar un mensaje.
  deleteInbox(mail, { id }) {
    console.log({ mail, id });

    mail = mail.toLowerCase();
    const compEmail = '@gmail.com';
    const headers = this.headers.append('User-Email', `${mail}${compEmail}`);
    return this.http.delete(`${this.URI}/inbox/delete/${id}`, { headers });
  }

  // Metodo para agregar a fovoritos un mensaje.
  putInboxFavorite(mail, form) {
    mail = mail.toLowerCase();
    const compEmail = '@gmail.com';
    const headers = this.headers.append('User-Email', `${mail}${compEmail}`);
    return this.http.put(`${this.URI}/inbox/favorite/${form.id}`, form, {
      headers
    });
  }

  // Retorna los mensajes que correspondan al correo enviado.
  // Si se envia el parametro id nos retorna el detalle de ese mensaje.
  getSent(mail, id?) {
    mail = mail.toLowerCase();
    const compEmail = '@gmail.com';

    if (id) {
      return this.http.get(`${this.URI}/sent/${mail}${compEmail}/${id}`);
    } else {
      return this.http.get(`${this.URI}/sent/${mail}${compEmail}`);
    }
  }
}
