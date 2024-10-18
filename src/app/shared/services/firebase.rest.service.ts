import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRestService {
  constructor(private firestore: AngularFirestore) {}

  public getProfiles() {
    return this.firestore.collection('profiles').valueChanges();
  }
}
