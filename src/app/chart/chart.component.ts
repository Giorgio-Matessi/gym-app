import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  getAllExerciseNamesForUser,
  getExerciseRecords,
  postItem,
  deleteExercise,
} from '../shared/api';
import { lineChartOptions } from '../shared/chart-details';
import { Item, record } from '../shared/models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  public chart: any;

  username: string = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    //this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blue',
          },
        ],
      },
      options: lineChartOptions,
    });
  }
}
