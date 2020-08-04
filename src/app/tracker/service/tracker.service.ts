import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Project} from "../models/project.model";

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  projects: Project[];

  constructor(
    private http: HttpClient
  ) {
    this.projects = [];
  }

  getProjects() {
    return this.http.get(environment.api + 'projects/');
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
  endTask(uuid, body) {
    return this.http.put(environment.api + `tasks/${uuid}/`, body);
  }
  deleteTask(uuid: string) {
    return this.http.delete(environment.api + `tasks/${uuid}/`);
  }
  getProjectName(id: number) {
    return this.projects.filter(t => t.id === id)[0].name;
  }
}
