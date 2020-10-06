import {formatDate} from "@angular/common";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public username: string;
  public dateJoined;
  constructor(object: any) {
    this.id = object.id;
    this.firstName = object.first_name;
    this.lastName = object.last_name;
    this.email = object.email;
    this.username = object.username;
    if (object.date_joined) {
      this.dateJoined = new Date(object.date_joined);
    }
  }
  get dateOfJoin() {
    return formatDate(this.dateJoined, 'MMM d, y', 'en-US');
  }
}
