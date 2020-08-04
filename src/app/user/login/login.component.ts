import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  constructor(
    private userService: UserService,
    private router: Router
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
      error => {},
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
