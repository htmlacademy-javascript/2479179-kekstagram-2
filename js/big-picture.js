const COMMENTS_PER_PAGE = 5; // Количество комментариев для подгрузки

// Находим нужные элементы в разметке
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentLoader = bigPicture.querySelector('.comments-loader');
// eslint-disable-next-line no-unused-vars
const commentTemplate = document.createElement('li'); // Создаем элемент для комментария
const pictureCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('#picture-cancel');

// Переменные для отслеживания комментариев
let comments = [];
let currentCommentCount = 0;

// Функция для создания DOM-элемента комментария
function createCommentElement({ avatar, name, message }) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = avatar;
  imgElement.alt = name;
  imgElement.width = 35;
  imgElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = message;

  commentElement.appendChild(imgElement);
  commentElement.appendChild(textElement);

  return commentElement;
}

// Функция для загрузки комментариев
function loadMoreComments() {
  const fragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentCommentCount, currentCommentCount + COMMENTS_PER_PAGE);

  nextComments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  commentList.appendChild(fragment);
  currentCommentCount += nextComments.length;

  commentShownCount.textContent = currentCommentCount;

  if (currentCommentCount >= comments.length) {
    commentLoader.classList.add('hidden'); // Скрываем кнопку, если комментарии закончились
  }
}

// Функция открытия полноэкранного изображения
export function openBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  pictureCaption.textContent = photo.description;

  // Сбрасываем комментарии перед новой загрузкой
  commentList.innerHTML = '';
  comments = photo.comments;
  currentCommentCount = 0;

  commentTotalCount.textContent = comments.length;
  commentLoader.classList.remove('hidden'); // Показываем кнопку загрузки комментариев
  loadMoreComments(); // Загружаем первые комментарии

  // Показываем блок с комментариями
  document.querySelector('.social__comment-count').classList.remove('hidden');

  // Добавляем обработчик для кнопки "Загрузить ещё"
  commentLoader.addEventListener('click', loadMoreComments);
}

// Функция закрытия полноэкранного изображения
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Убираем обработчик, чтобы не было дублирования
  commentLoader.removeEventListener('click', loadMoreComments);
}

// Добавляем обработчики событий
closeButton.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});
