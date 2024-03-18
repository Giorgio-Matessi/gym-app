import { Item } from './models';

var apiBaseSlug =
  'https://enkbrf1xqk.execute-api.us-east-1.amazonaws.com/items';

export async function getAllExerciseNamesForUser(user: string) {
  return await fetch(`${apiBaseSlug}/${user}`);
}

export async function getExerciseRecords(user: string, exercise_name: string) {
  return await fetch(`${apiBaseSlug}/${user}/${exercise_name}`);
}

export async function deleteExercise(user: string) {
  return await fetch(`${apiBaseSlug}/${user}`, {
    method: 'DELETE',
  });
}

function generateDataString(data: any) {
  return JSON.stringify(data);
}

export async function postItem(item: Item) {
  console.log('postExercise');
  return await fetch(apiBaseSlug, {
    method: 'PUT',
    body: generateDataString(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
