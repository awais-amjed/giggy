/**
 * @jest-environment jsdom
 */

import * as htmlFunctions from '../modules/html_functions.js';

// Mock Implementation of populateJokes Function
jest.spyOn(htmlFunctions, 'populateJokes');
htmlFunctions.populateJokes.mockImplementation(() => {
  const jokesListNode = document.getElementById('jokes-list');

  for (let i = 0; i < 10; i += 1) {
    const jokeNode = document.createElement('div');
    jokeNode.classList.add('joke-card');
    jokesListNode.appendChild(jokeNode);
  }
});

describe('Count Number of Items on the Homepage', () => {
  document.body.innerHTML = `
   <main>
    <section id="jokes-list" class="row">
    </section>
  </main>
   `;

  test('Count number of Jokes when List is Empty', () => {
    expect(htmlFunctions.countAllItems()).toBe(0);
  });

  test('Count number of Jokes when List is Populated from API', async () => {
    await htmlFunctions.populateJokes({ category: 'Dark' });
    expect(htmlFunctions.countAllItems()).toBe(10);
  });
});
