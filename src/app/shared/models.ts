export interface Item {
  username: string;
  exercise_name: string;
  records: record[];
}

export interface record {
  date: string;
  repitiion_count: number;
  weight: number;
  set_count: number;
}
