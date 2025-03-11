import { renderPictures, container } from './render-pictures.js';
import { debounce, createRandomIdFromRangeGenerator } from './utils.js';

const PICTURE_RANDOM_COUNT = 10;
const filterForm = document.querySelector('.img-filters__form');

// Удалить все фото
const clearPictures = () => {
  container.querySelectorAll('.picture').forEach((el) => el.remove());
};

// Показать фильтры
const showFilters = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

// Подсветка кнопки
const onFilterButtonClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const debounceRerender = debounce((data) => {
  clearPictures();
  renderPictures(data);
});

// Фильтры
const filtersFunctions = {
  'filter-default': (data) => debounceRerender(data),
  'filter-random': (data) => {
    const createPictureId = createRandomIdFromRangeGenerator(0, data.length - 1);
    const randomPictures = [];
    while (randomPictures.length < Math.min(PICTURE_RANDOM_COUNT, data.length)) {
      randomPictures.push(data[createPictureId()]);
    }
    debounceRerender(randomPictures);
  },
  'filter-discussed': (data) => {
    debounceRerender(data.slice().sort((a, b) => b.comments.length - a.comments.length));
  }
};

// Изменить фильтр
const changeImgFilter = (posts) => {
  filterForm.addEventListener('click', (evt) => {
    filtersFunctions[evt.target.id](posts);
    onFilterButtonClick(evt);
  });
};

// Инициализация
const initFilter = (posts) => {
  showFilters();
  changeImgFilter(posts);
};

export { initFilter };
