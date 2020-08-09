import {formatDate} from "@angular/common";
import {Project} from "./project.model";

export class Task {
  public uuid: string;
  public title: string;
  public project: Project;
  public tag: string;
  public _startTime: Date;
  public _endTime: Date;

  timeZone: string;

  readonly OPTIONS = {
    month: 'long', day: 'numeric', hour: 'numeric',
    minute: 'numeric', timeZone: this.timeZone, hour12: false,
    hourCycle: 'h23'
  };
  readonly TIME_OPTIONS = {
    hour: 'numeric', minute: 'numeric',
    timeZone: this.timeZone, hour12: false,
    hourCycle: 'h23'
  };

  constructor(task) {
    this.uuid = task.uuid;
    this.title = task.title;
    this.project = new Project(task.project.id, task.project.name);
    this.tag = task.tag;
    this.startTime = task.start_time;
    this.endTime = task.end_time;

    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  set startTime(value: string|null) {
    if (value === null) {
      this._startTime = new Date();
    } else {
      this._startTime = new Date(value);
    }
  }

  set endTime(value: string|null) {
    if (value === null) {
      this._endTime = null;
    } else {
      this._endTime = new Date(value);
    }
  }

  get startTime() {

    return this._startTime.toLocaleTimeString('en-US', this.OPTIONS );
  }

  get endTime() {
    if (this._endTime === null) {
      return 'present'
    }
    if (this._endTime.toLocaleDateString() !== this._startTime.toLocaleDateString()) {
      return this._endTime.toLocaleString('en-US', this.OPTIONS);
    } else {
      return this._endTime.toLocaleTimeString('en-US', this.TIME_OPTIONS);
    }
  }

  get time() {
    let timeDelta = this._endTime.getTime() - this._startTime.getTime();
    return (new Date(timeDelta)).toISOString().substr(11, 8);
  }

  get initTimer() {
    return ((new Date()).getTime() - this._startTime.getTime());
  }
}
