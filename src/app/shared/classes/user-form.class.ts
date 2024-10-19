import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signal } from '@angular/core';
import { tap } from 'rxjs';
import { v4 } from 'uuid';
import { UserInfoService } from '../services/user-info.service';
import { IUserInfo } from '../services/firebase.rest.service';

export abstract class UserForm {
  public userForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<number | null>(null),
    profilePicture: new FormControl<string | null>(null),
  });

  readonly errorMessages = [
    {
      type: 'required',
      msg: 'This field is required',
    },
    {
      type: 'email',
      msg: 'Incorrect mail format',
    },
  ];

  public imgUrl = signal<string | null>(null);

  constructor(protected userInfo: UserInfoService) {}

  public login(): void {
    this.userInfo.login(this.email.value);
  }

  public logout(): void {}

  public register(): void {
    this.userInfo
      .register(this.userForm.getRawValue() as IUserInfo)
      .subscribe();
  }

  public update(): void {}

  public upload(event: any): void {
    const file = event.target.files[0];
    this.profilePicture.setValue(this.profilePicture.value || v4());
    this.userInfo
      .uploadImg(file, this.profilePicture.value)
      .pipe(tap((url) => this.imgUrl.set(url)))
      .subscribe();
  }

  public delete(): void {
    this.userInfo
      .removeImg(this.profilePicture.value)
      .pipe(tap(() => this.imgUrl.set(null)))
      .subscribe();
  }

  public get email(): FormControl {
    return this.userForm.get('email') as FormControl;
  }

  public get firstName(): FormControl {
    return this.userForm.get('firstName') as FormControl;
  }

  public get lastName(): FormControl {
    return this.userForm.get('lastName') as FormControl;
  }

  public get phoneNumber(): FormControl {
    return this.userForm.get('phoneNumber') as FormControl;
  }

  public get profilePicture(): FormControl {
    return this.userForm.get('profilePicture') as FormControl;
  }
}
