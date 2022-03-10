import Comments from '../modules/comments.js';

const comments = new Comments();
const mockData = [
  {
    comment: 'This is nice!',
    creation_date: '2021-01-10',
    username: 'John',
  },
  {
    comment: 'Great content!',
    creation_date: '2021-02-10',
    username: 'Jane',
  },
];
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockData),
}));

describe('Get comments the the length', () => {
  test('2 Comment added count should be 2', async () => {
    await comments.get('test');

    expect(comments.commentCount()).toBe(2);
  });
});