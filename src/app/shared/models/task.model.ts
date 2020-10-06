import {Project} from './project.model';

export class Task {
  public uuid: string;
  public title: string;
  public project: Project|null;
  public tag: string;
  public start: Date;
  public end: Date;

  timeZone: string;

  private OPTIONS = {
    month: 'long', day: 'numeric', hour: 'numeric',
    minute: 'numeric', timeZone: null, hour12: false,
    hourCycle: 'h23'
  };
  private TIME_OPTIONS = {
    hour: 'numeric', minute: 'numeric',
    timeZone: null, hour12: false,
    hourCycle: 'h23'
  };

  constructor(task) {
    this.uuid = task.uuid;
    this.title = task.title;
    if (task.project) {
      this.project = new Project(task.project.id, task.project.name);
    }
    this.tag = task.tag;
    this.startTime = task.start_time;
    this.endTime = task.end_time;

    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.OPTIONS.timeZone = this.timeZone;
    this.TIME_OPTIONS.timeZone = this.timeZone;
  }
  get startTime() {

    return this.start.toLocaleTimeString('en-US', this.OPTIONS );
  }
  set startTime(value: string|null) {
    if (value === null) {
      this.start = new Date();
    } else {
      this.start = new Date(value);
    }
  }

  set endTime(value: string|null) {
    if (value === null) {
      this.end = null;
    } else {
      this.end = new Date(value);
    }
  }
  get endTime() {
    if (this.end === null) {
      return 'present';
    }
    if (this.end.toLocaleDateString() !== this.start.toLocaleDateString()) {
      return this.end.toLocaleString('en-US', this.OPTIONS);
    } else {
      return this.end.toLocaleTimeString('en-US', this.TIME_OPTIONS);
    }
  }

  get time() {
    const timeDelta = this.end.getTime() - this.start.getTime();
    return (new Date(timeDelta)).toISOString().substr(11, 8);
  }

  get initTimer() {
    return ((new Date()).getTime() - this.start.getTime());
  }
}
