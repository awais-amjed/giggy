import InvolvementAPI from '../modules/involvement_api.js';

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
    await InvolvementAPI.getComments('test');

    expect(InvolvementAPI.commentCount()).toBe(2);
  });
});