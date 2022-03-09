export default class JokeAPI {
  static baseURL = 'https://v2.jokeapi.dev/joke/';

  static blacklistFlags = 'blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  static jokeCategories = {
    dark: ['Dark', 'idRange=0-140'],
    programming: ['Programming', 'idRange=0-11'],
  }

  static getJokes = ({ category = this.jokeCategories.dark }) => fetch(`
  ${this.baseURL}/${category[0]}?${this.blacklistFlags}&${category[1]}&amount=10
  `, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(async (response) => {
    if (response.status === 200) {
      const data = await response.json();
      return data.jokes;
    }
    return null;
  });
}