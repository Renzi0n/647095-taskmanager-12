import {FilterType} from "../consts.js";
import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from "./task.js";

export const getFilteredTasks = (tasks) => {
  return tasks.reduce((acc, item) => {
    return Object.assign(acc, {
      [FilterType.ALL]: !item.isArchive ? [...acc[FilterType.ALL], item] : acc[FilterType.ALL],
      [FilterType.OVERDUE]: isTaskExpired(item.dueDate) ? [...acc[FilterType.OVERDUE], item] : acc[FilterType.OVERDUE],
      [FilterType.TODAY]: isTaskExpiringToday(item.dueDate) ? [...acc[FilterType.TODAY], item] : acc[FilterType.TODAY],
      [FilterType.FAVORITES]: item.isFavorite ? [...acc[FilterType.FAVORITES], item] : acc[FilterType.FAVORITES],
      [FilterType.REPEATING]: isTaskRepeating(item.repeating) ? [...acc[FilterType.REPEATING], item] : acc[FilterType.REPEATING],
      [FilterType.ARCHIVE]: item.isArchive ? [...acc[FilterType.ARCHIVE], item] : acc[FilterType.ARCHIVE],
    });
  }, {
    [FilterType.ALL]: [],
    [FilterType.OVERDUE]: [],
    [FilterType.TODAY]: [],
    [FilterType.FAVORITES]: [],
    [FilterType.REPEATING]: [],
    [FilterType.ARCHIVE]: [],
  });
};
