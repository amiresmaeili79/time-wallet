import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Project} from "../../shared/models/project.model";
import {TrackerService} from "../../shared/services/tracker.service";
import {Task} from "../../shared/models/task.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  newTask: FormGroup;
  projects: Project[];
  tasksDone: Task[];
  tasksDoing: Task[];

  readonly tags = [
    'personal', 'client'
  ];
  readonly format = 24;

  constructor(
    private trackerService: TrackerService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.tasksDoing = [];
    this.tasksDone = [];
    this.newTask = new FormGroup({
      title: new FormControl(null, Validators.required),
      project: new FormControl(''),
      tag: new FormControl(null)
    });
    this.trackerService.getProjects().subscribe(
      (value: any) => this.projects = value.projects.map(prj => new Project(prj.id, prj.name)),
      error => {},
      () => {
        this.trackerService.projects = this.projects;
        this.getTasks();
      });
  }

  ngOnInit(): void {
  }

  submit() {
    const body = this.newTask.getRawValue();
    this.trackerService.newTask(body).subscribe(
      value => {},
      error => {},
      () => {
        this.snackBar.open('New task added', 'Dismiss', {duration: 1000});
        this.getTasks();
        this.resetForm();
      }
    );
  }

  getTasks() {
    this.trackerService.getTasks().subscribe(
      (value: any) => {
        this.tasksDoing = value.tasks.map(t => new Task(t));
        this.tasksDone = value.done.map(t => new Task(t));
      },
      error => {},
      () => {
        this.tasksDone.reverse();
        this.tasksDoing.reverse();
      }
    );
  }

  resetForm() {
    this.newTask.reset();
  }
}
