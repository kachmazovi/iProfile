import { NgClass } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { UserForm } from '../shared/classes/user-form.class';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MsgViewComponent } from '../shared/components/msg-view/msg-view.component';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, MsgViewComponent],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss',
})
export class UserAuthComponent extends UserForm {
  public isLogin = signal(true);

  constructor() {
    super();

    effect(() => {
      if (this.isLogin()) {
        this.firstName?.removeValidators(Validators.required);
        this.lastName?.removeValidators(Validators.required);
      } else {
        this.firstName?.addValidators(Validators.required);
        this.lastName?.addValidators(Validators.required);
      }

      this.firstName.updateValueAndValidity();
      this.lastName.updateValueAndValidity();
      this.userForm.reset();
    });
  }
}
