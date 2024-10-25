import { Component, effect, OnInit, signal } from '@angular/core';
import { UserForm } from '../shared/classes/user-form.class';
import { UserInfoService } from '../shared/services/user-info.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MsgViewComponent } from '../shared/components/msg-view/msg-view.component';
import { NgClass } from '@angular/common';
import { finalize, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MsgViewComponent, NgClass],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent extends UserForm implements OnInit {
  public isEditing = signal(false);
  public defaultImage = '../../assets/images/default.png';

  constructor(protected override userInfo: UserInfoService) {
    super(userInfo);

    effect(() => {
      if (this.isEditing()) {
        this.userForm.enable();
        this.email.disable();
      } else {
        this.userForm.disable();
      }
    });
  }

  ngOnInit(): void {
    this.initUserProfile();
    this.initProfileImg();
  }

  public cancelEditing(): void {
    this.isEditing.set(false);
    this.initUserProfile();
  }

  public updateUser(): void {
    this.userInfo.spinner.set(true);
    this.update()
      .pipe(
        finalize(() => {
          this.userInfo.spinner.set(false);
          this.isEditing.set(false);
        })
      )
      .subscribe();
  }

  private initUserProfile(): void {
    const { email, firstName, lastName, phoneNumber, profilePicture } =
      this.userInfo.currentUser();

    this.email.setValue(email);
    this.firstName.setValue(firstName);
    this.lastName.setValue(lastName);
    this.phoneNumber.setValue(phoneNumber);
    this.profilePicture.setValue(profilePicture);
    this.userForm.disable();
  }

  private initProfileImg() {
    if (this.profilePicture.value) {
      this.userInfo.spinner.set(true);

      this.userInfo
        .getProfileImage(this.profilePicture.value)
        .pipe(
          takeUntil(this.$destroy),
          tap((url) => {
            this.imgUrl.set(url);
          }),
          finalize(() => this.userInfo.spinner.set(false))
        )
        .subscribe();
    }
  }
}
