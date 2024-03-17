import { record } from './models';
import { lineChartOptions } from './chart-details';

export function sortDates(records: record[]) {
  var isDescending = false;
  records.sort((a, b) =>
    isDescending
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function calculateVolume(records: record[]) {
  let volumes: number[] = [];
  records.forEach((record) => {
    volumes.push(record.repitiion_count * record.weight * record.set_count);
  });
  return volumes;
}

export function createChartData(records: record[], exerciseSelected: string) {
  let chartData = {
    labels: records.map((record) => record.date),
    datasets: [
      {
        data: calculateVolume(records),
        label: exerciseSelected,
      },
    ],
    options: lineChartOptions,
  };
  return chartData;
}
export function validateDate(date: string | null | undefined) {
  return !isNaN(Date.parse(date?.toString() || ''));
}
export function validateNumber(num: number) {
  return !isNaN(num);
}
export function validateString(str: string) {
  return str !== '';
}
export function validateExerciseName(
  exerciseName: string,
  exerciseList: string[]
) {
  return (
    exerciseList.includes(exerciseName) ||
    exerciseList.includes(exerciseName + 's')
  );
}
