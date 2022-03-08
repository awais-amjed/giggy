import './style.css';
import JokeAPI from './modules/joke_api.js';

JokeAPI.getJokes(JokeAPI.jokeCategories.dark).then((value) => console.log(value));