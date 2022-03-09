import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { populateJokes, darkJokesButtonListener, programmingJokesButtonListener } from './modules/html_functions.js';
import InvolvementAPI from './modules/involvement_api.js';

import './img/loading.gif';

populateJokes({ category: 'Dark' });

const meow = async () => {
  const temp = await InvolvementAPI.postLike({ itemID: 31 });
  console.log(temp);
  console.log((await InvolvementAPI.getLikes()));
};

meow();

document.getElementById('dark-jokes-button').addEventListener('click', darkJokesButtonListener);
document.getElementById('programming-jokes-button').addEventListener('click', programmingJokesButtonListener);