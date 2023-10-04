import { Injectable, inject, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Produtos } from '../components/principal/principal.component';
import { ref } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  produtos?: Observable<Produtos[]>;
  
  
  
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
  }
  ngOnInit(): void {
    
    }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getDados() { 
    return this.firestore.collection('PRODUTOS').valueChanges();
    
    
  }
}
