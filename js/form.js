import { initEffect, resetEffect } from './slider.js';
import { resetScale } from './scale.js';
import { sendPictures } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const errorText = {
  INVALID_COUNT: `maximum ${MAX_HASHTAG_COUNT} hashtags`,
  NOT_UNIQUE: 'Hashtags must be unique',
  INVALID_PATTERN: 'Wrong hashtag'
};

const submitButtonCaption = {
  SUBMITTING: 'Sending...',
  IDLE: 'Publish',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');
const photoPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

// Кнопка "Опубликовать"
function toggleSubmitButton(isDisabled) {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? submitButtonCaption.SUBMITTING : submitButtonCaption.IDLE;
}

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Преобразование тегов
function convertTags(tagString) {
  return tagString.trim().split(' ').filter((tag) => tag.length);
}

// Проверка типа файла
function isTypeValid(file) {
  return FILE_TYPES.some((type) => file.name.toLowerCase().endsWith(type));
}


// Валидация хештегов
function isTagValid(value) {
  return convertTags(value).every((tag) => VALID_SYMBOLS.test(tag));
}
function isCountValid(value) {
  return convertTags(value).length <= MAX_HASHTAG_COUNT;
}

function isTagUnique(value) {
  const lowerCaseTags = convertTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
}

// Добавление валидаторов
pristine.addValidator(hashtagField, isTagValid, errorText.INVALID_PATTERN, 1, true);
pristine.addValidator(hashtagField, isTagUnique, errorText.NOT_UNIQUE, 2, true);
pristine.addValidator(hashtagField, isCountValid, errorText.INVALID_COUNT, 3, true);

// Проверка фокуса на текстовых полях
const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

// Проверка наличия ошибки
const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

// Закрытие по Esc
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    closeImgModal();
  }
}

// Открытие изображения
function onFileInputChange() {
  const file = imgUploadInput.files[0];
  if (file && isTypeValid(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  openImgModal();
}

// Закрытие окна
function onCancelButtonClick() {
  return closeImgModal();
}

// Отправка формы
async function sendForm(formElement) {
  if (!pristine.validate()) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendPictures(new FormData(formElement));
    closeImgModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
}

// Сабмит формы
function onFormSubmit(evt) {
  evt.preventDefault();
  sendForm(evt.target);
}

// Открытие окна
function openImgModal() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

// Закрытие окна
function closeImgModal() {
  imgUploadForm.reset();
  pristine.reset();
  resetEffect();
  resetScale();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadCancel.addEventListener('click', onCancelButtonClick);
imgUploadInput.addEventListener('change', onFileInputChange);
imgUploadForm.addEventListener('submit', onFormSubmit);
initEffect();
