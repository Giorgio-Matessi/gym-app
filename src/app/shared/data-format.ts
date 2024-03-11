import { record } from './models';

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
