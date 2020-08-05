import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {UserModel} from "./models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'time-tracker-front';
  user: UserModel;
  constructor(
    private http: HttpClient,
    public userService: UserService,
    private router: Router
  ) {
    if (userService.isLoggedIn()) {
      this.userService.getProfile().subscribe(
        (value: any) => {
          this.user = new UserModel(value.user)
        },
        error => {},
        () => this.userService.updateUser(this.user)
    );
    } else {
      this.router.navigateByUrl('login').then();
    }
  }
}
