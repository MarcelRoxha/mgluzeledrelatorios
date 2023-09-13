import { Injectable, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private afAuth: AngularFireAuth) {
  }
  ngOnInit(): void {
    
    }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // logout() {
  //   return this.afAuth.signOut();
  // }
}
