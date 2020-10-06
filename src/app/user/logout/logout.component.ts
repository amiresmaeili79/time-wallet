import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService) {
    this.userService.logOut();
  }

  ngOnInit(): void {
  }

}
