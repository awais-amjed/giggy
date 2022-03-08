import JokeAPI from './joke_api.js';

const populateJokes = async ({ category = 'Dark' }) => {
  let jokes = [];

  if (category === 'Dark') {
    jokes = await JokeAPI.getJokes(JokeAPI.jokeCategories.dark);
  } else if (category === 'Programming') {
    jokes = await JokeAPI.getJokes(JokeAPI.jokeCategories.programming);
  }

  jokes.forEach(({ setup, delivery, joke }) => {
    const jokeNode = document.createElement('div');
    jokeNode.classList.add('joke-card');
    jokeNode.innerHTML = `
      <div class="joke-text">
        ${joke ? `<p>${joke}</p>` : `<p>${setup}</p><p>${delivery}</p>`}
        <hr>
      </div>
    `;

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Comments';

    jokeNode.appendChild(commentsButton);
    document.getElementById('jokes-list').appendChild(jokeNode);
  });
};

export default populateJokes;