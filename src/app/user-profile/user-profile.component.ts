import { Component, effect, OnInit, signal } from '@angular/core';
import { UserForm } from '../shared/classes/user-form.class';
import { UserInfoService } from '../shared/services/user-info.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MsgViewComponent } from '../shared/components/msg-view/msg-view.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MsgViewComponent, NgClass],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent extends UserForm implements OnInit {
  public isEditing = signal(false);

  constructor(protected override userInfo: UserInfoService) {
    super(userInfo);

    effect(() => {
      if (this.isEditing()) {
        this.userForm.enable();
      } else {
        this.userForm.disable();
      }
    });
    console.log('edited: ', this.userInfo.currentUser());
  }

  ngOnInit(): void {
    this.initUserProfile();
  }

  public cancelEditing(): void {
    this.isEditing.set(false);
    this.initUserProfile();
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
}
