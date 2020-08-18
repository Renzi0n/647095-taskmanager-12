import {TASK_COLORS} from '../consts.js';
import {getRandomInteger, getRandomArrElement} from "../utils.js";

const DESCRIPTIONS = [
  `Посмотреть лекцию`,
  `Приготовить обед`,
  `Почитать книгу`,
];

const generateDate = () => {
  const MAX_DAYS_GAP = 7;

  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false,
  };
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    };

  return {
    description: getRandomArrElement(DESCRIPTIONS),
    dueDate,
    repeating,
    color: getRandomArrElement(TASK_COLORS),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
