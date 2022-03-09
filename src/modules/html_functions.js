import JokeAPI from './joke_api.js';
import handleComment from './comments_controller.js';
import InvolvementAPI from './involvement_api.js';

const colorsArray = [
  '#005F99',
  '#172774',
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

const countAllItems = () => document.getElementById('jokes-list').querySelectorAll('.joke-card').length;

const showJokeCount = () => {
  document.getElementById('joke-count').innerHTML = `Jokes Count: ${countAllItems()}`;
};

export const showPopup = (error) => {
  const popup = document.getElementById('popup');
  if (error) {
    popup.querySelector('p').textContent = error;
  }

  popup.style.display = 'block';
  popup.classList.remove('animate__slideOutRight');
  popup.classList.add('animate__slideInRight');
  setTimeout(() => {
    popup.classList.remove('animate__slideInRight');
    popup.classList.add('animate__slideOutRight');
  }, 3000);
};

const updateItemLikes = async ({ likesContainer = null, id = null }) => {
  // Increases the like amount of an item by 1
  if (likesContainer === null || id === null) {
    return;
  }

  let currentItem = InvolvementAPI.itemLikes.find((item) => item.item_id === id);
  if (!currentItem) {
    await InvolvementAPI.getLikes();
    currentItem = InvolvementAPI.itemLikes.find((item) => item.item_id === id);
  } else {
    currentItem.likes += 1;
  }
  likesContainer.querySelector('p').classList.remove('animate__headShake');
  setTimeout(() => {
    likesContainer.querySelector('p').classList.add('animate__zoomIn');
  }, 1);
  likesContainer.querySelector('p').innerHTML = `${currentItem.likes} Likes`;
};

const heartButtonListener = async ({ likesContainer = null, id = null }) => {
  // Update the number of likes of an Item & Save it to Cloud
  if (likesContainer === null || id === null) {
    return;
  }

  const heartButton = likesContainer.querySelector('.heart');
  if (!heartButton.classList.contains('is-heart-active')) {
    heartButton.classList.add('is-heart-active');
    likesContainer.querySelector('p').classList.add('animate__headShake');
    const isAdded = await InvolvementAPI.postLike({ itemID: id });
    if (isAdded === true) {
      await updateItemLikes({ likesContainer, id });
    }
  } else {
    showPopup('We get it, You like this Joke. Move on now lol');
  }
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
    jokeContainer.classList.add('joke-container', 'col-lg-4', 'col-md-6', 'col-xxl-3', 'animate__animated', 'animate__zoomIn');

    const jokeNode = document.createElement('div');
    jokeNode.classList.add('joke-card');
    const color = newColors[i];
    jokeNode.style['background-color'] = color;

    jokeContainer.appendChild(jokeNode);

    const currentItem = InvolvementAPI.itemLikes.find((item) => item.item_id === joke.id);
    jokeNode.innerHTML = `
      <div class="joke-text">
        ${joke.joke ? `<p>${joke.joke.replaceAll('\n', '<br>')}</p>` : `<p>${joke.setup}</p><p>${joke.delivery}</p>`}
        <hr>
        <div class="likes-container">
            <p class="animate__animated">${currentItem ? currentItem.likes : 0} Likes</p>
            <div class="heart"></div>
        </div>
      </div>
    `;
    const likesContainer = jokeNode.querySelector('.likes-container');
    likesContainer.querySelector('.heart').addEventListener('click', () => {
      heartButtonListener({ likesContainer, id: joke.id });
    });

    const commentsButton = document.createElement('button');
    commentsButton.innerText = 'Comments';
    commentsButton.onclick = async () => handleComment(joke, color);
    jokeNode.appendChild(commentsButton);
    jokesListNode.appendChild(jokeContainer);
    i += 1;
  });
  showJokeCount();
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