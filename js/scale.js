const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modal = document.querySelector('.img-upload');
const smallerButton = modal.querySelector('.scale__control--smaller');
const biggerButton = modal.querySelector('.scale__control--bigger');
const scaleInput = modal.querySelector('.scale__control--value');
const image = modal.querySelector('.img-upload__preview img');

// Масштаб
const scaleImage = function (value) {
  image.style.transform = `scale(${value / 100})`; // Размер
  scaleInput.value = `${value}%`; // new значение в поле ввода
};

// Уменьшение масштаба
const onSmallerButtonClick = function () {
  scaleImage(
    Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

// Увеличение масштаба
const onBiggerButtonClick = function () {
  scaleImage(
    Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

// Сброс масштаба
const resetScale = function () {
  scaleImage(DEFAULT_SCALE);
};
smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);
export { resetScale };
