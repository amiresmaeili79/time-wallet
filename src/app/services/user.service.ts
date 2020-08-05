import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, ReplaySubject} from "rxjs";
import {UserModel} from "../models/user.model";
import * as jwt_decode from "jwt-decode";

@Injectable()
export class UserService {

  user = new ReplaySubject<UserModel>(1);

  constructor(
    private http: HttpClient
  ) {}

  login(body: object) {
    return this.http.post(environment.auth, body);
  }
  getUser() {
    return this.user.asObservable();
  }
  updateUser(user: UserModel): void {
    this.user.next(user);
  }
  signUp(user: object) {
    return this.http.post(environment.user, user);
  }
  recordToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    try {
      return jwt_decode(this.getToken());
    } catch (e) {
      localStorage.clear();
      return false;
    }
  }
  getProfile() {
    return this.http.get(environment.user + 'me/');
  }
  logOut() {
    localStorage.clear();
    this.updateUser(null);
  }
}
