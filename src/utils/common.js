export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElements = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);

  return elements[randomIndex];
};

export const getRandomBooleanValue = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
