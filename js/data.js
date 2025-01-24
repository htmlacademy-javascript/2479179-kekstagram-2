import { getRandomNumber } from './utils';

// Определяем массив случайных имен для комментариев
const names = ['Анна', 'Максим', 'Елена', 'Иван', 'Ольга', 'Артем', 'Дарья', 'Алексей', 'София', 'Николай'];

// Определяем массив возможных сообщений для комментариев
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Функция для генерации случайного комментария
export function generateComment(commentId) {
  const name = names[getRandomNumber(0, names.length - 1)];
  const message =
    messages[getRandomNumber(0, messages.length - 1)] +
    (Math.random() > 0.5 ? ` ${messages[getRandomNumber(0, messages.length - 1)]}` : '');
  const avatarNumber = getRandomNumber(1, 6);

  return {
    id: commentId,
    avatar: `img/avatar-${avatarNumber}.svg`,
    message,
    name,
  };
}
