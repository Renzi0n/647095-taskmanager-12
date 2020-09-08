import {TASK_COLORS} from '../consts.js';
import {getRandomInteger, getRandomElements, getRandomBooleanValue} from "../utils/common.js";

const DESCRIPTIONS = [
  `Посмотреть лекцию`,
  `Приготовить обед`,
  `Почитать книгу`,
];
const MAX_DAYS_GAP = 7;

const generateDate = () => {
  const isDate = getRandomBooleanValue();

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
  const isWednesday = getRandomBooleanValue();

  return {
    mo: false,
    tu: false,
    we: isWednesday,
    th: false,
    fr: isWednesday === false || getRandomBooleanValue(),
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
    description: getRandomElements(DESCRIPTIONS),
    dueDate,
    repeating,
    color: getRandomElements(TASK_COLORS),
    isArchive: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
  };
};
