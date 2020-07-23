import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {Project} from "./models/project.model";
import {TrackerService} from "./service/tracker.service";
import {Task} from "./models/task.model";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private snackBar: MatSnackBar
  ) {
    this.tasksDoing = [];
    this.tasksDone = [];
    this.newTask = new FormGroup({
      title: new FormControl(null, Validators.required),
      project: new FormControl(null),
      tag: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.trackerService.getProjects().subscribe(
      (value: any) => this.projects = value.projects.map(prj => new Project(prj.id, prj.name)),
      error => {}
    );
    this.getTasks();
  }

  submit() {
    const body = this.newTask.getRawValue();
    this.trackerService.newTask(body).subscribe(
      value => {},
      error => {},
      () => {
        this.snackBar.open('New task added', 'Dismiss', {duration: 1000});
        this.getTasks();
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
}
