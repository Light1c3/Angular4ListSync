import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit{
  user: any;
  titleName: string = "Guest";
  avatarImage: string = "http://via.placeholder.com/100x100";
  neededItems: FirebaseListObservable<any[]>;  
  assignedItems: FirebaseListObservable<any[]>;  
  msgVal: string = '';
  
  constructor(public afAuth: AngularFireAuth, private router: Router, public af: AngularFireDatabase) {

    this.afAuth.authState.subscribe(auth => {
      if(auth) {
        this.user = auth;
      }
    });

    this.neededItems = af.list('/neededItems', {
      query: {
        limitToLast: 50
      }
    });

    this.assignedItems = this.af.list('/assignedItems', {
      query: {
        limitToLast: 50
      }
    });
  }

  Logout() {
     this.afAuth.auth.signOut();
     this.router.navigateByUrl('/login');
  }

  Send(desc: string) {
    if(!this.user.isAnonymous) {
      this.neededItems.push({ message: desc});
      this.msgVal = '';
    }
  }

  DeleteItem(selectedItem){
    if(!this.user.isAnonymous) {
      this.neededItems.remove(selectedItem.$key);
      console.log(selectedItem);
    }
  }

  TakeItem(selectedItem){
    if(!this.user.isAnonymous) {
      console.log(selectedItem);
      this.assignedItems.push({selectedItem, avatarURL: this.user.photoURL});
      this.neededItems.remove(selectedItem);
    }
  }

  ClearLists() {
    this.neededItems.remove();
    this.assignedItems.remove();
  }

  DebuggingShowItemInfo(item){
    console.log(item)
  }

  ngOnInit(){
    console.log(this.user);
    if(!this.user.isAnonymous) {
      this.titleName = this.user.displayName;
      this.avatarImage = this.user.photoURL;
    }
    console.log(this.assignedItems);
    
  }
}
