import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { populateJokes, darkJokesButtonListener, programmingJokesButtonListener } from './modules/html_functions.js';

import './img/loading.gif';

populateJokes({ category: 'Dark' });

document.getElementById('dark-jokes-button').addEventListener('click', darkJokesButtonListener);
document.getElementById('programming-jokes-button').addEventListener('click', programmingJokesButtonListener);