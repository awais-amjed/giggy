export default class InvolvementAPI {
  // This class handles all calls to Involvement API

  static baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';

  // static appID = 'UDoWa8zVty29gxAuSZ13';
  static appID = 'rIad9hF9lO1yv2bMdKPx';

  static itemLikes = [];

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
      this.itemLikes = await response.json();
      return true;
    }
    return null;
  });
}