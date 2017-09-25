import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  user: any;
  titleName: string = "Guest";
  avatarImage: string = "http://via.placeholder.com/100x100";
  eventName: string;
  events: FirebaseListObservable<any[]>;
  firebase: any;
  
  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase) {
    
    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.user = auth;
        this.firebase = af;
      }
    });
  }

  AddEvent(){
    if(!this.user.isAnonymous) {
      this.events.push({ eventName: this.eventName});
    }
    this.eventName = "";
  }

  EventDetails(event){
    this.router.navigate(['/members'], { queryParams: {event_key: "Other Data"} });
  }

  Logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    if(!this.user.isAnonymous) {
      this.titleName = this.user.displayName;
      this.avatarImage = this.user.photoURL;

      this.events = this.firebase.list('/' + this.user.uid, {
        query: {
          limitToLast: 50
        }
      });
    }
    
  }

}
