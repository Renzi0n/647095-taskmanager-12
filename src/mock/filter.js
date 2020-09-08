import {isTaskExpired, isTaskRepeating, isTaskExpiringToday} from "../utils/task.js";

const getTaskToFilterMap = (tasks) => {
  return tasks.reduce((acc, item) => ({
    all: !item.isArchive ? ++acc.all : acc.all,
    overdue: !item.isArchive && isTaskExpired(item.dueDate) ? ++acc.overdue : acc.overdue,
    today: !item.isArchive && isTaskExpiringToday(item.dueDate) ? ++acc.today : acc.today,
    favorites: !item.isArchive && item.isFavorite ? ++acc.favorites : acc.favorites,
    repeating: !item.isArchive && isTaskRepeating(item.repeating) ? ++acc.repeating : acc.repeating,
    archive: tasks.length - acc.all,
  }), {
    all: 0,
    overdue: 0,
    today: 0,
    favorites: 0,
    repeating: 0,
  });
};

export const generateFilter = (tasks) => {
  return Object.entries(getTaskToFilterMap(tasks)).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks,
    };
  });
};
