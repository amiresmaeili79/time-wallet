import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(
    private http: HttpClient
  ) { }

  getProjects() {
    return this.http.get(environment.api + 'tasks/project/');
  }
  newTask(body: object) {
    return this.http.post(environment.api + 'tasks/', body);
  }
  getTasks() {
    return this.http.get(environment.api + 'tasks/');
  }
  getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  endTask(body) {
    return this.http.put(environment.api + 'tasks/task/', body);
  }
}
