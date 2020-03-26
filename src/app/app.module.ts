import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { SentComponent } from './pages/sent/sent.component';
import { DeletedComponent } from './pages/deleted/deleted.component';
import { NewComponent } from './pages/new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './shared/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InboxComponent,
    SentComponent,
    DeletedComponent,
    NewComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
