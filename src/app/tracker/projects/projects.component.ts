import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TrackerService} from "../../services/tracker.service";
import {Project} from "../../models/project.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  newProject: FormGroup;
  projects: Project[];
  constructor(
    private trackerService: TrackerService,
    private snackBar: MatSnackBar
  ) {
    this.newProject = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getProjects();
  }

  submit() {
    const body = this.newProject.getRawValue();
    this.trackerService.addProject(body).subscribe(
      value => {},
      error => {},
      () => {
        this.snackBar.open('New project added', 'Dismiss', {duration: 1000});
        this.getProjects();
        this.resetForm();
      }
    );
  }
  getProjects() {
    this.trackerService.getProjects().subscribe(
      (value: any) => this.projects = value.projects.map(i => new Project(i.id, i.name)),
      error => {},
      () => {}
    );
  }

  resetForm() {
    this.newProject.reset();
  }

  deleteProject(id: number) {
    this.trackerService.deleteProject(id).subscribe(
      value => {},
      error => {},
      () => {
        this.snackBar.open('Project deleted', 'Dismiss', {duration: 1000});
        this.getProjects();
      }
    );
  }
}
