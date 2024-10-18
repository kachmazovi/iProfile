import { FormControl, FormGroup, Validators } from '@angular/forms';

export abstract class UserForm {
  public userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    profilePicture: new FormControl(''),
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

  constructor() {}

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
