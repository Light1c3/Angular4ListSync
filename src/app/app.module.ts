import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { EventsComponent } from './events/events.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAJzjAXeG7FCHSkpIlb5RDxNBiWhL7TANs",
  authDomain: "userauthtest-32ef9.firebaseapp.com",
  databaseURL: "https://userauthtest-32ef9.firebaseio.com",
  storageBucket: "userauthtest-32ef9.appspot.com",
  messagingSenderId: "920542398643"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MembersComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
