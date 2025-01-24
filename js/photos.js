import { getRandomNumber } from './utils.js';
import { generateComment } from './data.js';

export function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const likes = getRandomNumber(15, 200);
    const commentsCount = getRandomNumber(0, 30);
    const comments = Array.from({ length: commentsCount }, (_, index) =>
      generateComment(i * 1000 + index)
    );

    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: `Описание фотографии номер ${i}`,
      likes,
      comments,
    };

    photos.push(photo);
  }

  return photos;
}
