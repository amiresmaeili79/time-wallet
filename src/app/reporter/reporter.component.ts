import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/js/canvasjs.min.js';
import {ReportService} from '../shared/services/report.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {MatRadioChange} from '@angular/material/radio';
import {TrackerService} from '../shared/services/tracker.service';
import {Project} from '../shared/models/project.model';
import {min} from 'rxjs/operators';

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
  ) {
    this.dateRange = new FormGroup({
      start_date: new FormControl(null, Validators.required),
      end_date: new FormControl(null, Validators.required),
      type: new FormControl('column', Validators.required)
    });
  }

  ngOnInit(): void {
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
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'dark2',
      title: {
        text: 'Working hours',
      },
      data: [{
        type,
        dataPoints: data
      }]
    });

    chart.render();
  }

  renderPieChart() {
    console.log(this.pieChart);
    let totalSec = 0;
    this.pieChart.map(i => totalSec += i[0]);
    const dataPoints = this.pieChart.map(i => {
      return {
        y: (i[0] / totalSec * 100).toFixed(2),
        label: i[1] ? i[1] : 'undefined'
      };
    });
    const chart = new CanvasJS.Chart('pie-chart', {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'dark1',
      title: {
        text: 'Projects working hours share',
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
  numberToTime(n: number): string {
    let result = `${n - n % 1}:`;
    const minute = ((n % 1) * 60).toFixed(0);
    result += minute.length > 1 ? minute : '0' + minute;
    return result;
  }
}
