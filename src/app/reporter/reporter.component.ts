import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min.js';
import {ReportService} from "./services/report.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.component.html',
  styleUrls: ['./reporter.component.scss']
})
export class ReporterComponent implements OnInit {

  reports: any[];
  dateRange: FormGroup;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.dateRange = new FormGroup({
      start_date: new FormControl(null, Validators.required),
      end_date: new FormControl(null, Validators.required),
      type: new FormControl('column', Validators.required)
    });
    // this.getReports();
  }
  getReports() {
    const body = this.dateRange.getRawValue();
    const start = formatDate(body.start_date, 'y-MM-dd', 'en-US');
    const end = formatDate(body.end_date, 'y-MM-dd', 'en-US');
    this.reportService.getReports(start, end).subscribe(
      (value: any) => this.reports = value.work_hours,
      error => {},
      () => {
        const reportData = [];
        Object.keys(this.reports).map( (i) =>  {
          reportData.push({y: this.reports[i], label: i});
        });
        this.reports = reportData;
        this.renderChart(reportData, body.type);
      }
    );
  }
  renderChart(data: any[], type: string) {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'dark1',
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

  typeChanged(value: MatRadioChange) {
    this.dateRange.controls.type.setValue(value.value);

  }
}
