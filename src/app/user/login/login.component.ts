import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {UserModel} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.minLength(4),
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  login() {
    const loginCredits = this.loginForm.getRawValue();
    this.userService.login(loginCredits).subscribe(
      (value: any) => {
        if (value.access) {
          this.userService.recordToken(value.access);
        }
      },
      error => {
        this.matSnackBar.open(error.error.detail, 'OK', {duration:1000});
      },
      () => {
        this.userService.getProfile().subscribe(
          (value: any) => this.userService.updateUser(new UserModel(value.user)),
          error => {},
          () => this.router.navigateByUrl('/')
        );
      }
    );
  }
}
