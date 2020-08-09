import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min.js';
import {ReportService} from "../services/report.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {MatRadioChange} from "@angular/material/radio";
import {TrackerService} from "../services/tracker.service";
import {Project} from "../models/project.model";

@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.component.html',
  styleUrls: ['./reporter.component.scss']
})
export class ReporterComponent implements OnInit {

  reports: any[];
  totalHour: number;
  pieChart: any[];
  dateRange: FormGroup;
  projects: Project[];
  chartRendered: boolean;

  constructor(
    private reportService: ReportService,
    private trackerService: TrackerService
  ) { }

  ngOnInit(): void {
    this.dateRange = new FormGroup({
      start_date: new FormControl(null, Validators.required),
      end_date: new FormControl(null, Validators.required),
      type: new FormControl('column', Validators.required)
    });
    this.trackerService.getProjects().subscribe(
      (value: any) => this.projects = value.projects.map(pro => new Project(pro.id, pro.name))
    );
    // this.getReports();
  }
  getReports() {
    this.chartRendered = true;
    const body = this.dateRange.getRawValue();
    const start = formatDate(body.start_date, 'y-MM-dd', 'en-US');
    const end = formatDate(body.end_date, 'y-MM-dd', 'en-US');
    this.reportService.getReports(start, end).subscribe(
      (value: any) => {
        this.reports = value.work_hours;
        this.totalHour = value.total;
        this.pieChart = value.project_base;
      },
      error => {},
      () => {
        const reportData = [];
        Object.keys(this.reports).map( (i) =>  {
          reportData.push({y: this.reports[i], label: i});
        });
        this.reports = reportData;
        this.renderChart(reportData, body.type);
        this.renderPieChart();
      }
    );
  }
  renderChart(data: any[], type: string) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'dark2',
      title: {
        text: "Working hours",
      },
      data: [{
        type: type,
        dataPoints: data
      }]
    });

    chart.render();
  }

  renderPieChart() {
    let totalSec = 0;
    this.pieChart.map(i => totalSec+= i[0]);
    console.log(totalSec);
    const dataPoints = this.pieChart.map(i => {
      return {
        y: (i[0] / totalSec * 100).toFixed(2),
        label: i[1] ? this.getProjectName(i[1]): 'undefined'
      }
    });
    console.log(dataPoints);
    const chart = new CanvasJS.Chart("pie-chart", {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'dark1',
      title: {
        text: "Projects working hours share",
      },
      data: [{
        type: 'pie',
        startAngle: 240,
        indexLabel: '{label} {y}',
        dataPoints
      }]
    });
    chart.render();
  }

  typeChanged(value: MatRadioChange) {
    this.dateRange.controls.type.setValue(value.value);
  }
  getProjectName(id: number) {
    return this.projects.filter(t => t.id === id)[0].name;
  }
}
