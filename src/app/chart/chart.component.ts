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
import {
  calculateVolume,
  sortDates,
  createChartData,
} from '../shared/data-format';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  public chart: any;

  public username: string = '';
  public exerciseList: string[] = [];
  public records: record[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    getAllExerciseNamesForUser(this.username).then((data) => {
      data.json().then((data) => {
        data.map((item: Item) => {
          this.exerciseList.push(item.exercise_name);
        });
      });
    });
    this.createBasicChart();
  }

  createBasicChart() {
    this.chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
          },
        ],
      },
      options: lineChartOptions,
    });
  }

  onMainExerciseSelect(exerciseSelected: string) {
    getExerciseRecords(this.username, exerciseSelected).then((data) => {
      data.json().then((data) => {
        this.records = data.records;
        sortDates(this.records);

        this.chart.data = createChartData(this.records, exerciseSelected);
        this.chart.update();
      });
    });
  }
}
