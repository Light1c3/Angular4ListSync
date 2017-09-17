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
  neededItems: FirebaseListObservable<any[]>;
  
  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase) {
    
        this.afAuth.authState.subscribe(auth => {
          if(auth) {
            this.user = auth;
          }
        });
      }

  ngOnInit() {
  }

}
