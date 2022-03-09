import Comments from './comments.js';

const commentSection = document.getElementById('comment-view');
const commentsBody = document.getElementById('comment-content');

const addListItem = (comment) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${comment.creation_date} ${comment.username} : ${comment.comment}`;
  document.getElementById('comments-list').appendChild(listItem);
};

const createComments = async (id, exists = false) => {
  const comments = new Comments();
  const commentList = exists ? document.getElementById('comments-list') : document.createElement('ul');
  if (!exists) {
    commentList.setAttribute('id', 'comments-list');
  } else {
    commentList.innerHTML = '';
  }
  const loading = document.createElement('li');
  loading.setAttribute('id', 'comment-loader');
  loading.innerHTML = `
    <div class="loading-image-comment col-12">
        <img src="./img/loading.gif" alt="" height="50px">
    </div>
  `;
  commentList.appendChild(loading);

  if (!exists) {
    commentsBody.appendChild(commentList);
  }
  await comments.get(id);
  loading.remove();
  if (comments.comments.length > 0) {
    comments.comments.map((comment) => addListItem(comment));
  } else {
    commentList.innerHTML = 'No comments have been made';
  }
  document.getElementById('comments-title').innerHTML = `Comments(${comments.commentCount()})`;
};

const createCloseIcon = () => {
  const closeIcon = document.createElement('span');
  closeIcon.innerHTML = 'close';
  closeIcon.classList.add('material-icons', 'close-btn');
  closeIcon.onclick = () => { commentSection.style.display = 'none'; };
  commentsBody.appendChild(closeIcon);
};

const addComment = async (id) => {
  const comments = new Comments();
  const comment = {
    item_id: id,
    username: document.getElementById('name').value,
    comment: document.getElementById('comment').value,
  };
  await comments.add(comment);
  createComments(id, true);
};
const createForm = (id) => {
  const form = document.createElement('form');
  form.setAttribute('action', '#');
  form.innerHTML = `<label for="name"><input type="text" id="name" required placeholder="Your name">
</label>
<label for="comment">
<textarea name="comment-field" id="comment" cols="30" rows="5" required placeholder="Your insight"></textarea>
</label>
<button id="comment-btn">
Comment
</button>`;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await addComment(id);
    form.reset();
  });
  commentsBody.appendChild(form);
};

const handleComment = async (joke, color) => {
  commentsBody.innerHTML = '';
  createCloseIcon();
  commentsBody.style.backgroundColor = color;
  const jokeCard = document.createElement('div');
  jokeCard.classList.add('comments-joke-card');
  jokeCard.style.backgroundColor = 'white';
  jokeCard.innerHTML = `${joke.joke ? `<p class="joke">${joke.joke.replaceAll('\n', '<br>')}</p>` : `<p class="joke" >${joke.setup}</p><p class="joke">${joke.delivery}</p>`}`;
  commentsBody.appendChild(jokeCard);
  const title = document.createElement('p');
  title.classList.add('joke-title');
  title.innerHTML = 'Joke title';
  commentsBody.appendChild(title);
  const inforCard = document.createElement('div');
  inforCard.classList.add('info-card');
  inforCard.innerHTML = `<p class="info-text">Category:${joke.category}</p><p class="info-text">Type: ${joke.type}</p>
<p class="info-text">Safe: ${joke.safe}</p>
<p class="info-text">lang: English</p>`;
  commentsBody.appendChild(inforCard);
  const commentsTitle = document.createElement('p');
  commentsTitle.classList.add('joke-title');
  commentsTitle.setAttribute('id', 'comments-title');
  commentsTitle.innerHTML = 'Comments()';
  commentsBody.appendChild(commentsTitle);
  createComments(joke.id.toString());
  const addTitle = document.createElement('p');
  addTitle.classList.add('joke-title');
  addTitle.innerHTML = 'Add a comment';
  addTitle.style.marginTop = '40px';
  commentsBody.appendChild(addTitle);
  createForm(joke.id.toString());
  commentSection.style.display = 'block';
};

export default handleComment;
