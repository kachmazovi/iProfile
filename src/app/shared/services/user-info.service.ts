import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  public isLogged = signal(false);
}
