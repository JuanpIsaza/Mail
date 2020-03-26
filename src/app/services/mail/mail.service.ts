import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  URI: string = environment.URI;

  constructor(private http: HttpClient) {}

  // Retorna los correos de la bandeja(Inbox).
  // Si se envia el parametro id nos retorna el detalle de ese mensaje.
  getInbox(id?) {
    if (id) {
      return this.http.get(`${this.URI}/inbox/:${id}`);
    } else {
      return this.http.get(`${this.URI}/inbox`);
    }
  }

  // Metodo para enviar un nuevo mensaje.
  postInboxSent(form) {
    return this.http.post(`${this.URI}/inbox/send`, form);
  }

  // Metodo para eliminar un mensaje.
  deleteInbox(id) {
    return this.http.delete(`${this.URI}/delete/:${id}`);
  }

  // Metodo para agregar a fovoritos un mensaje.
  putInboxFavorite(form) {
    return this.http.put(`${this.URI}/inbox/:${form.id}`, form);
  }

  // Retorna los mensajes que correspondan al correo enviado.
  // Si se envia el parametro id nos retorna el detalle de ese mensaje.
  getSent(mail, id?) {
    if (id) {
      return this.http.get(`${this.URI}/sent/:${mail}/:${id}`);
    } else {
      return this.http.get(`${this.URI}/sent/:${mail}`);
    }
  }
}
