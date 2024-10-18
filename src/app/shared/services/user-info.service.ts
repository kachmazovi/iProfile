import { Injectable, signal } from '@angular/core';
import { FirebaseRestService, IUserInfo } from './firebase.rest.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

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
}
