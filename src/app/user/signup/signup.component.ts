import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUp: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    ) {
    this.signUp = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ]),
      firstName: new FormControl(null, [
        Validators.required,
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      rePassword: new FormControl(null, [
        Validators.required
      ])
    }, this.checkPassword);
  }

  ngOnInit(): void {
  }

  checkPassword(control: AbstractControl) {
    if (control.get('password').dirty) {
      const psw = control.get('password').value;
      const rePsw = control.get('rePassword').value;
      if (psw !== rePsw) {
        control.get('rePassword').setErrors({passwordNotMatch: true});
      }
    }
    return null;
  }

  submit() {
    const data = this.signUp.getRawValue();
    const body = {
      email: data.email,
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password
    };
    this.userService.signUp(body).subscribe(
      value => {},
      error => {
        this.matSnackBar.open(error.error.detail, 'OK', {duration:1000});
      },
      () => {
        this.matSnackBar.open('Signed up successfully', 'OK',
                        {duration:1000});
        this.router.navigateByUrl('/auth/login').then();
      }
    );
  }
}
