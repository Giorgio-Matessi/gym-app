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
import { Colors } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  public chart: any;
  public username: string = '';
  public exerciseList: string[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    getAllExerciseNamesForUser('test1').then((data) => {
      data.json().then((data) => {
        data.map((item: Item) => {
          this.exerciseList.push(item.exercise_name);
        });
        console.log(this.exerciseList);
      });
    });
    this.createChart();
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
