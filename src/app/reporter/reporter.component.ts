import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min.js';
import {ReportService} from "./services/report.service";

@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.component.html',
  styleUrls: ['./reporter.component.scss']
})
export class ReporterComponent implements OnInit {

  reports: any[];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getReports();
  }
  getReports() {
    this.reportService.getReports('week').subscribe(
      (value: any) => this.reports = value.work_hours,
      error => {},
      () => {
        const reportData = [];
        Object.keys(this.reports).map( (i) =>  {
          reportData.push({y: this.reports[i], label: i});
        });
        this.reports = reportData;
        this.renderChart(reportData, 'column');
      }
    );
  }
  renderChart(data: any[], type: string) {
    console.log(data);
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
}
