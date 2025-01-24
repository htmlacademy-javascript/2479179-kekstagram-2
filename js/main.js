/* eslint-disable no-console */
import { generatePhotos } from './photos';

// Генерация массива фотографий
const generatedPhotos = generatePhotos();
console.log(generatedPhotos);

// Отрисовываем миниатюры
import { renderThumbnails } from './thumbnails.js';
renderThumbnails();
