import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: number;
  profilePicture?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseRestService {
  constructor(private firestore: AngularFirestore) {}

  public getProfiles(): Observable<IUserInfo[]> {
    return this.firestore.collection<IUserInfo>('profiles').valueChanges();
  }
}
