import './render-big-pictures.js';
import './form.js';
import './slider.js';
import { renderPictures } from './render-pictures.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './utils.js';
import { initFilter } from './filters.js';

// Загрузка и рендеринг фото
async function bootstrap() {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
    initFilter(pictures);
  } catch {
    showErrorMessage();
  }
}

bootstrap();
