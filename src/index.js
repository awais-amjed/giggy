import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { populateJokes, darkJokesButtonListener, programmingJokesButtonListener } from './modules/html_functions.js';
import 'animate.css';

import './img/logo.png';
import './img/loading.gif';
import './img/error500.png';

const init = async () => {
  await populateJokes({ category: 'Dark', getLikes: true });
};

init();

document.getElementById('dark-jokes-button').addEventListener('click', darkJokesButtonListener);
document.getElementById('programming-jokes-button').addEventListener('click', programmingJokesButtonListener);