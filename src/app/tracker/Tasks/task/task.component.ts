import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../models/task.model";
import {TimeInterval} from "rxjs";
import {formatDate} from "@angular/common";
import {TrackerService} from "../../../services/tracker.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() updated: EventEmitter<void>;

  timerInterval: any;
  timer: number;
  timerStr: string;

  projectName: string;

  constructor(
    private trackerService: TrackerService,
    private matSnackBar: MatSnackBar
  ) {
    this.timerInterval = null;
    this.updated = new EventEmitter<void>();
  }

  ngOnInit(): void {

    if (this.task.endTime === 'present') {
      this.timer = this.task.initTimer //ms;
      this.timerInterval = setInterval(() => {
        this.setTimer();
      }, 1000);
    }
  }
  setTimer() {
    this.timer += 1000
    this.timerStr = (new Date(this.timer)).toISOString().substr(11, 8);
  }

  endTask() {
    const body = {
      uuid: this.task.uuid,
      end_time: formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ssZZZZZ', 'en-US', this.task.timeZone)
    }
    this.trackerService.endTask(this.task.uuid, body).subscribe(
      value => {},
      error => {},
      () => {
        this.updated.emit();
        this.matSnackBar.open('The task finished successfully',
          'Dismiss', {duration: 1000} );
      }
    );
  }

  reDoTask() {
    const body = {
      title: this.task.title,
      tag: this.task.tag,
      project: this.task.project,
    }
    this.trackerService.newTask(body).subscribe(
      value => {},
      error => {},
      () => {
        this.updated.emit();
        this.matSnackBar.open('The task renewed successfully',
          'Dismiss', {duration: 1000} );
      }
    );
  }

  delete() {
    this.trackerService.deleteTask(this.task.uuid).subscribe(
      value => {},
      error => {},
      () => {
        this.matSnackBar.open('Task deleted', 'Dismiss', {duration:1000})
        this.updated.emit();
      }
    );
  }
}