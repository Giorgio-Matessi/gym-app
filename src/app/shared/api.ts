import { Item } from './models';

var apiBaseSlug =
  'https://enkbrf1xqk.execute-api.us-east-1.amazonaws.com/standard/items';

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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
    },
  });
}
