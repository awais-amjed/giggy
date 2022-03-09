import JokeAPI from './joke_api.js';
import handleComment from './comments_controller.js';

const colorsArray = [
  '#005F99',
  '#D22779',
  '#7900FF',
  '#1E3163',
  '#1DB9C3',
  '#72147E',
  '#252525',
  '#153E90',
  '#DB66E4',
  '#3E978B',
];

const shuffle = (array) => {
  // Function to shuffle the contents of an array

  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

const populateJokes = async ({ category = 'Dark' }) => {
  // Populates the Jokes array based on the Category passed.

  const jokesListNode = document.getElementById('jokes-list');
  jokesListNode.innerHTML = `
    <div class="loading-image col-12">
        <img src="./img/loading.gif" alt="" height="200px">
    </div>
  `;

  const newColors = shuffle(colorsArray);
  let jokes = [];

  if (category === 'Dark') {
    jokes = await JokeAPI.getJokes({ category: JokeAPI.jokeCategories.dark });
  } else if (category === 'Programming') {
    jokes = await JokeAPI.getJokes({ category: JokeAPI.jokeCategories.programming });
  }

  jokesListNode.innerHTML = '';

  let i = 0;
  jokes.forEach((joke) => {
    const jokeContainer = document.createElement('div');
    jokeContainer.classList.add('joke-container', 'col-lg-4', 'col-md-6', 'col-xxl-3');

    const jokeNode = document.createElement('div');
    jokeNode.classList.add('joke-card');
    const color = newColors[i];
    jokeNode.style['background-color'] = color;

    jokeContainer.appendChild(jokeNode);
    jokeNode.innerHTML = `
      <div class="joke-text">
        ${joke.joke ? `<p>${joke.joke.replaceAll('\n', '<br>')}</p>` : `<p>${joke.setup}</p><p>${joke.delivery}</p>`}
        <hr>
      </div>
    `;

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Comments';
    commentsButton.onclick = async () => handleComment(joke, color);
    jokeNode.appendChild(commentsButton);
    jokesListNode.appendChild(jokeContainer);
    i += 1;
  });
};

const darkJokesButtonListener = async () => {
  const darkJokesButton = document.getElementById('dark-jokes-button');
  if (darkJokesButton.classList.contains('active') === true) {
    return;
  }

  document.getElementById('programming-jokes-button').classList.remove('active');
  darkJokesButton.classList.add('active');
  await populateJokes({ category: 'Dark' });
};

const programmingJokesButtonListener = async () => {
  const programmingJokesButton = document.getElementById('programming-jokes-button');
  if (programmingJokesButton.classList.contains('active') === true) {
    return;
  }

  document.getElementById('dark-jokes-button').classList.remove('active');
  programmingJokesButton.classList.add('active');
  await populateJokes({ category: 'Programming' });
};

export { populateJokes, darkJokesButtonListener, programmingJokesButtonListener };