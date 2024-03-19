import Chart from 'chart.js/auto';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Item, record } from '../shared/models';
import { lineChartOptions } from '../shared/chart-details';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import {
  getAllExerciseNamesForUser,
  getExerciseRecords,
  postItem,
  deleteExercise,
} from '../shared/api';
import {
  sortDates,
  createChartData,
  validateDate,
  validateExerciseName,
  validateNumber,
} from '../shared/data-format';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
//TODO: Add a method to add an exercise name
export class ChartComponent {
  @ViewChild(MatTable) table!: MatTable<record>;
  displayedColumns: string[] = [
    'date',
    'repitiion_count',
    'weight',
    'set_count',
  ];
  public chart: any;
  public username: string = '';
  public exerciseList: string[] = [];
  public records: record[] = [];
  public exerciseSelected: string = '';
  public newExercise: string = '';

  dateFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  repetitionFormGroup = this._formBuilder.group({
    secondCtrl: [undefined, Validators.required],
  });
  weightFormGroup = this._formBuilder.group({
    secondCtrl: [undefined, Validators.required],
  });
  setFormGroup = this._formBuilder.group({
    secondCtrl: [undefined, Validators.required],
  });

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    if (this.username === '' || this.username === 'undefined') {
      this.router.navigateByUrl('/login');
    }

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

  onAddExercise() {
    if (validateExerciseName(this.newExercise, this.exerciseList)) {
      this._snackBar.open('Exercise already exists', 'Close');
      return;
    }

    if (this.newExercise === '') {
      this._snackBar.open('Please enter an exercise name', 'Close');
      return;
    }

    let newItem: Item = {
      username: this.username,
      exercise_name:
        this.newExercise.charAt(0).toUpperCase() + this.newExercise.slice(1),
      records: [],
    };

    postItem(newItem).then(() => {
      this._snackBar.open('Exercise Successfully Added', 'Close');
      this.exerciseList.push(this.newExercise);
    });
  }

  onDeleteExercise() {
    deleteExercise(this.username, this.exerciseSelected).then(() => {
      this._snackBar.open('Exercise Successfully Deleted', 'Close');
      this.exerciseList = this.exerciseList.filter(
        (item) => item !== this.exerciseSelected
      );
      this.chart.data = createChartData([], '');
      this.table.renderRows();
      this.chart.update();
    });
  }

  //TODO: Add mat-calender to the date input
  onAddRecord() {
    if (this.exerciseSelected === '') {
      this._snackBar.open('Please select an exercise', 'Close');
      return;
    }

    if (!validateDate(this.dateFormGroup.value.firstCtrl || '')) {
      this._snackBar.open('Please enter a valid date', 'Close');
      return;
    }

    if (!validateNumber(this.repetitionFormGroup.value.secondCtrl || 0)) {
      this._snackBar.open('Please enter a valid repetition count', 'Close');
      return;
    }

    if (!validateNumber(this.setFormGroup.value.secondCtrl || 0)) {
      this._snackBar.open('Please enter a valid set count', 'Close');
      return;
    }

    if (!validateNumber(this.weightFormGroup.value.secondCtrl || 0)) {
      this._snackBar.open('Please enter a valid weight', 'Close');
      return;
    }

    let newRecord = {
      date: new Date(
        this.dateFormGroup.value.firstCtrl?.toString() || ''
      ).toLocaleDateString(),
      repitiion_count: this.repetitionFormGroup.value.secondCtrl || 0,
      weight: this.weightFormGroup.value.secondCtrl || 0,
      set_count: this.setFormGroup.value.secondCtrl || 0,
    };

    this.records.push(newRecord);
    sortDates(this.records);

    let newItem: Item = {
      username: this.username,
      exercise_name: this.exerciseSelected,
      records: this.records,
    };

    postItem(newItem).then(() => {
      this._snackBar.open('Record Successfully Submitted', undefined, {
        duration: 2000,
      });
      this.table.renderRows();
      this.chart.data = createChartData(this.records, this.exerciseSelected);
      this.chart.update();
    });
  }

  onMainExerciseSelect(exerciseSelected: string) {
    this.exerciseSelected = exerciseSelected;
    getExerciseRecords(this.username, exerciseSelected).then((data) => {
      data.json().then((data) => {
        if (data.records === undefined) {
          this.records = [];
          this.chart.data = createChartData(this.records, exerciseSelected);
          this.chart.update();
          return;
        }
        this.records = data.records;
        sortDates(this.records);

        this.table.renderRows();

        this.chart.data = createChartData(this.records, exerciseSelected);
        this.chart.update();
      });
    });
  }
}
