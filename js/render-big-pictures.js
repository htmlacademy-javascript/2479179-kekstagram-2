import { isEscapeKey } from './utils.js';

const COMMENTS_COUNT_SHOWN = 5;
const userModal = document.querySelector('.big-picture');
const userModalClose = userModal.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const commentsList = userModal.querySelector('.social__comments');
const commentCount = userModal.querySelector('.social__comment-shown-count');
const commentsLoader = userModal.querySelector('.comments-loader');
const totalCommentsCount = userModal.querySelector('.social__comment-total-count');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsCountShown = 0;
let comments = [];

// Функция для создания одного комментария
const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true); // Шаблон комментария
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
};

// Функция для отображения комментариев
const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT_SHOWN;
  if (commentsCountShown >= comments.length) { // Hide кнопку загрузки
    commentsLoader.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }
  commentsList.innerHTML = ''; // delete старые комментарии
  commentsList.append(fragment); // add новые комментарии
  commentCount.textContent = commentsCountShown;
  totalCommentsCount.textContent = comments.length;
};

// Обработчик клика на кнопку загрузки комментариев
const onCommentsLoaderClick = () => renderComments();

// Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

// Modal open
function openUserModal() {
  userModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

// Modal close
function closeUserModal() {
  commentsCountShown = 0;
  userModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Display картинки и инфо
function renderBigPicture({ url, likes, description }) {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
}

// Modal + comment + picture
function showBigPicture(picture) {
  userModal.classList.remove('hidden');
  openUserModal();
  comments = picture.comments;
  renderComments();
  renderBigPicture(picture);
}

userModalClose.addEventListener('click', closeUserModal);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
