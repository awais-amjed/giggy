export default class InvolvementAPI {
  // This class handles all calls to Involvement API

  static baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

  static appID = 'UDoWa8zVty29gxAuSZ13';

  static itemLikes = [];

  static comments = [];

  static addComment = async (comment = {}, id = null) => {
    const results = await fetch(`${this.baseURL}/${this.appID}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (id != null) {
      await this.getComments(id);
    }
    return results;
  };

  static getComments = async (id) => {
    try {
      const data = await fetch(`${this.baseURL}/${this.appID}/comments?item_id=${id}`, { method: 'GET' });
      if (data.ok) {
        this.comments = await data.json();
      }
    } catch (e) {
      return [];
    }
    return this.comments;
  };

  static commentCount = () => (this.comments.length === undefined ? 0 : this.comments.length);

  static postLike = async ({ itemID = null }) => {
    if (itemID === null) {
      return null;
    }

    return fetch(`${this.baseURL}/${this.appID}/likes/`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemID,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.status === 201);
  }

  static getLikes = async () => fetch(`${this.baseURL}/${this.appID}/likes/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(async (response) => {
    if (response.status === 200) {
      let data = [];
      try {
        data = await response.json();
      } catch (e) {
        return null;
      }
      this.itemLikes = data;
      return true;
    }
    return null;
  });
}