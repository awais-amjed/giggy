import JokeAPI from './joke_api.js';

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
    jokes = await JokeAPI.getJokes(JokeAPI.jokeCategories.dark);
  } else if (category === 'Programming') {
    jokes = await JokeAPI.getJokes(JokeAPI.jokeCategories.programming);
  }

  jokesListNode.innerHTML = '';

  let i = 0;
  jokes.forEach(({ setup, delivery, joke }) => {
    const jokeContainer = document.createElement('div');
    jokeContainer.classList.add('joke-container', 'col-lg-4', 'col-md-6', 'col-xxl-3');

    const jokeNode = document.createElement('div');
    jokeNode.classList.add('joke-card');
    jokeNode.style['background-color'] = newColors[i];

    jokeContainer.appendChild(jokeNode);
    jokeNode.innerHTML = `
      <div class="joke-text">
        ${joke ? `<p>${joke.replaceAll('\n', '<br>')}</p>` : `<p>${setup}</p><p>${delivery}</p>`}
        <hr>
      </div>
    `;

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Comments';

    jokeNode.appendChild(commentsButton);
    jokesListNode.appendChild(jokeContainer);
    i += 1;
  });
};

export default populateJokes;