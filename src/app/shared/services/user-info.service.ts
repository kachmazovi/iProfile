import { Injectable, signal } from '@angular/core';
import { FirebaseRestService, IUserInfo } from './firebase.rest.service';
import { Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  public isLogged = signal(false);
  public currentUser = signal<IUserInfo>({} as IUserInfo);

  constructor(
    private firebaseRestServ: FirebaseRestService,
    private router: Router
  ) {}

  public login(email: string) {
    this.firebaseRestServ
      .getProfiles()
      .pipe(
        tap((users: IUserInfo[]) => {
          const currentUser = users.find((user) => user.email === email);
          if (currentUser) {
            this.isLogged.set(true);
            this.currentUser.set(currentUser);
            this.router.navigate(['edit-profile']);
          }
        })
      )
      .subscribe();
  }

  public register(userData: IUserInfo) {
    return this.firebaseRestServ.register(userData);
  }

  public getProfileImage(imgId: string): Observable<string> {
    return this.firebaseRestServ.getProfileImage(imgId);
  }

  public uploadImg(file: File, imgId: string) {
    return this.firebaseRestServ.uploadProfileImage(file, imgId).pipe(
      switchMap(() => {
        return this.getProfileImage(imgId);
      })
    );
  }

  public removeImg(imgId: string): Observable<any> {
    return this.firebaseRestServ.removeProfileImage(imgId);
  }
}
