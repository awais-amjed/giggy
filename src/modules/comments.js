export default class Comments {
  baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

  appId = 'UDoWa8zVty29gxAuSZ13';

  comments = [];

  add = async (comment = {}, id = null) => {
    const results = await fetch(`${this.baseUrl}apps/${this.appId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (id != null) {
      await this.get(id);
    }
    return results;
  };

  get = async (id) => {
    const data = await fetch(`${this.baseUrl}apps/${this.appId}/comments?item_id=${id}`, { method: 'GET' });
    const commentsData = await data.json();
    this.comments = commentsData;
    return this.comments;
  };

  commentCount = () => (this.comments.length === undefined ? 0 : this.comments.length);
}