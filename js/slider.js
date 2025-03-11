const styleOfEffect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectToFilter = {
  [styleOfEffect.CHROME]: { style: 'grayscale', unit: '' },
  [styleOfEffect.SEPIA]: { style: 'sepia', unit: '' },
  [styleOfEffect.MARVIN]: { style: 'invert', unit: '%' },
  [styleOfEffect.PHOBOS]: { style: 'blur', unit: 'px' },
  [styleOfEffect.HEAT]: { style: 'brightness', unit: '' },
};

const effectToSliderOptions = {
  [styleOfEffect.DEFAULT]: { min: 0, max: 100, step: 1 },
  [styleOfEffect.CHROME]: { min: 0, max: 1, step: 0.1 },
  [styleOfEffect.SEPIA]: { min: 0, max: 1, step: 0.1 },
  [styleOfEffect.MARVIN]: { min: 0, max: 100, step: 1 },
  [styleOfEffect.PHOBOS]: { min: 0, max: 3, step: 0.1 },
  [styleOfEffect.HEAT]: { min: 1, max: 3, step: 0.1 },
};

const modal = document.querySelector('.img-upload');
const image = modal.querySelector('.img-upload__preview img');
const effects = modal.querySelector('.effects');
const slider = modal.querySelector('.effect-level__slider');
const sliderContainer = modal.querySelector('.img-upload__effect-level');
const effectLevelValue = modal.querySelector('.effect-level__value');

let chosenEffect = styleOfEffect.DEFAULT;

// Чек на эффект по дэфолту
const isDefault = () => chosenEffect === styleOfEffect.DEFAULT;

// Применение эффекта
const setImageStyle = function () {
  if (isDefault()) {
    image.style.filter = null;
    return;
  }
  const { value } = effectLevelValue;
  const { style, unit } = effectToFilter[chosenEffect];
  image.style.filter = `${style}(${value}${unit})`;
};

// Слайдер
const showSlider = function () {
  sliderContainer.classList.remove('hidden');
};
const hideSlider = function () {
  sliderContainer.classList.add('hidden');
};
const onSliderUpdate = function () {
  effectLevelValue.value = slider.noUiSlider.get();
  setImageStyle(); //К картинке
};

// Создание слайдера
const createSlider = function ({ min, max, step }) {
  noUiSlider.create(slider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider(); // hide если дэфолтный
};

// Обновление при смене фильтра
const updateSlider = function ({ min, max, step }) {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = function () {
  if (isDefault()) {
    hideSlider(); // hide если дэфолтный
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider(); // show слайдер
  }
};

// Установка фильтра/эффекта
const setEffect = function (effect) {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

// Сброс эффекта на дефолт
const resetEffect = function () {
  setEffect(styleOfEffect.DEFAULT);
};

// Применить выбранный эффект
const onEffectChange = function (evt) {
  setEffect(evt.target.value);
};

const initEffect = function () {
  createSlider(effectToSliderOptions[chosenEffect]);
  effects.addEventListener('change', onEffectChange);
};

export { initEffect, resetEffect };
