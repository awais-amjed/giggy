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

const populateJokes = async ({ category = 'Dark' }) => {
  let jokes = [];

  if (category === 'Dark') {
    jokes = await JokeAPI.getJokes(JokeAPI.jokeCategories.dark);
  } else if (category === 'Programming') {
    jokes = await JokeAPI.getJokes(JokeAPI.jokeCategories.programming);
  }

  let i = 0;
  jokes.forEach(({ setup, delivery, joke }) => {
    const jokeContainer = document.createElement('div');
    jokeContainer.classList.add('joke-container', 'col-lg-4', 'col-md-6', 'col-xxl-3');

    const jokeNode = document.createElement('div');
    jokeNode.classList.add('joke-card');
    jokeNode.style['background-color'] = colorsArray[i];

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
    document.getElementById('jokes-list').appendChild(jokeContainer);
    i += 1;
  });
};

export default populateJokes;