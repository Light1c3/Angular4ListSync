import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = this.afAuth.authState;
    if(this.user){
      this.router.navigateByUrl('/events');
    }  
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          (success) => {
          this.router.navigate(['/events']);
        }).catch(
          (err) => {
          this.error = err;
        })
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(
          (success) => {
          this.router.navigate(['/members']);
        }).catch(
          (err) => {
          this.error = err;
        })
  }

  loginAnonymously() {
    this.afAuth.auth.signInAnonymously()    
        .then(
          (success) => {
          this.router.navigate(['/members']);
        }).catch(
          (err) => {
          this.error = err;
        })
  }


  ngOnInit() {
  }

}
