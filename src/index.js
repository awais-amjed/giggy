import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { populateJokes, darkJokesButtonListener, programmingJokesButtonListener } from './modules/html_functions.js';
import InvolvementAPI from './modules/involvement_api.js';
import 'animate.css';

import './img/loading.gif';

const init = async () => {
  await InvolvementAPI.getLikes();
  await populateJokes({ category: 'Dark' });
};

init();

document.getElementById('dark-jokes-button').addEventListener('click', darkJokesButtonListener);
document.getElementById('programming-jokes-button').addEventListener('click', programmingJokesButtonListener);