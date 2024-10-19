import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { db } from '../../../assets/configs/firebase.config';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';

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
  public storage = getStorage();

  constructor(private firestore: AngularFirestore) {}

  public getProfiles(): Observable<IUserInfo[]> {
    return this.firestore.collection<IUserInfo>('profiles').valueChanges();
  }

  public register(userData: IUserInfo): Observable<any> {
    return from<any>(setDoc(doc(db, 'profiles', userData.email), userData));
  }

  public update(userData: IUserInfo): Observable<any> {
    const currentUser = doc(db, 'profiles', userData.email);

    return from(
      updateDoc(currentUser, {
        ...userData,
      })
    );
  }

  public getProfileImage(imageId: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, `images/${imageId}`)));
  }

  public uploadProfileImage(
    file: File,
    imageId: string
  ): Observable<UploadResult> {
    const filePath = `images/${imageId}`;

    const profilePictureRef = ref(this.storage, filePath);

    return from(uploadBytes(profilePictureRef, file));
  }

  public removeProfileImage(imageId: string): Observable<any> {
    const desertRef = ref(this.storage, `images/${imageId}`);
    return from(deleteObject(desertRef));
  }
}
