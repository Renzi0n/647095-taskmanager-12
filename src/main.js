import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createSortTemplate} from './view/sort.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/taskEdit.js';
import {createLoadMoreBtnTemplate} from './view/loadMoreBtn.js';
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";


const TASKS_COUNT = 22;
const TASKS_COUNT_PER_STEP = 8;

const tasksData = new Array(TASKS_COUNT).fill().map(generateTask);
const filtersData = generateFilter(tasksData);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteMainNode = document.querySelector(`.main`);

const siteHeaderNode = siteMainNode.querySelector(`.main__control`);

render(siteHeaderNode, createMenuTemplate(), `beforeend`);
render(siteMainNode, createFilterTemplate(filtersData), `beforeend`);
render(siteMainNode, createBoardTemplate(), `beforeend`);

const siteBoardNode = siteMainNode.querySelector(`.board`);
const siteTasksBoardNode = siteBoardNode.querySelector(`.board__tasks`);

render(siteBoardNode, createSortTemplate(), `afterbegin`);

if (tasksData.length > TASKS_COUNT_PER_STEP) {
  let renderedTaskCount = TASKS_COUNT_PER_STEP;

  render(siteBoardNode, createLoadMoreBtnTemplate(), `beforeend`);

  const loadMoreButton = siteBoardNode.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasksData
      .slice(renderedTaskCount, renderedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => render(siteTasksBoardNode, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderedTaskCount >= tasksData.length) {
      loadMoreButton.remove();
    }
  });
}

for (let i = 1; i < Math.min(tasksData.length, TASKS_COUNT_PER_STEP); i++) {
  render(siteTasksBoardNode, createTaskTemplate(tasksData[i]), `afterbegin`);
}
render(siteTasksBoardNode, createTaskEditTemplate(tasksData[0]), `afterbegin`);
