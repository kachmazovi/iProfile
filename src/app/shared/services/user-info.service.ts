import { effect, Injectable, signal } from '@angular/core';
import { FirebaseRestService, IUserInfo } from './firebase.rest.service';
import { Router } from '@angular/router';
import { finalize, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  public spinner = signal(false);
  public isLoginPage = signal(true);
  public isLogged = signal(false);
  public wrongEmail = signal(false);
  public currentUser = signal<IUserInfo>({} as IUserInfo);

  constructor(
    private firebaseRestServ: FirebaseRestService,
    private router: Router
  ) {
    effect(() => {
      if (!this.isLogged()) this.router.navigate(['/auth']);
    });
  }

  public login(email: string) {
    this.spinner.set(true);
    this.firebaseRestServ
      .getProfiles()
      .pipe(
        tap((users: IUserInfo[]) => {
          const currentUser = users.find((user) => user.email === email);
          if (currentUser) {
            this.isLogged.set(true);
            this.currentUser.set(currentUser);
            this.router.navigate(['edit-profile']);
          } else {
            this.wrongEmail.set(true);
          }
          this.spinner.set(false);
        })
      )
      .subscribe();
  }

  public register(userData: IUserInfo) {
    this.spinner.set(true);
    return this.firebaseRestServ.register(userData).pipe(
      finalize(() => {
        this.spinner.set(false);
        this.isLoginPage.set(true);
      })
    );
  }

  public update(userData: IUserInfo) {
    return this.firebaseRestServ.update(userData);
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
