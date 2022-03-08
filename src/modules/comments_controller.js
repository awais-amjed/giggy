const commentSection = document.getElementById('comment-view');
const testBtn = document.getElementById('test-btn');
const closeIcon = document.getElementById('close-icon');

const initTest = () => {
  testBtn.onclick = () => { commentSection.style.display = 'block'; };
  closeIcon.onclick = () => { commentSection.style.display = 'none'; };
};

export default initTest;