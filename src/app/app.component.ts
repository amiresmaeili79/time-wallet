import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {UserModel} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'time-tracker-front';
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.userService.getProfile().subscribe(
      value => this.userService.updateUser(new UserModel(value))
    );
  }

  submit() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.http.get('http://127.0.0.1:8000/api/v1/tasks/', {headers}).subscribe(
      value => console.log(value)
    );
  }
}
