export default class JokeAPI {
  // This class handles all calls to Joke API

  static baseURL = 'https://v2.jokeapi.dev/joke/';

  static blacklistFlags = 'blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

  static jokeCategories = {
    dark: 'Dark',
    programming: 'Programming',
  }

  static getJokes = async ({ category = this.jokeCategories.dark }) => fetch(`
  ${this.baseURL}/${category}?${this.blacklistFlags}&amount=10
  `, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(async (response) => {
    if (response.status === 200) {
      try {
        const data = await response.json();
        return data.jokes;
      } catch (e) {
        return null;
      }
    }
    return null;
  }).catch(() => {
    return null;
  });
}