import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate} from './view/board.js';
import {createSortTemplate} from './view/sort.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/taskEdit.js';
import {createLoadMoreBtnTemplate} from './view/loadMoreBtn.js';


const TASKS_COUNT = 3;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const siteMainNode = document.querySelector(`.main`);

const siteHeaderNode = siteMainNode.querySelector(`.main__control`);

render(siteHeaderNode, createMenuTemplate(), `beforeend`);
render(siteMainNode, createFilterTemplate(), `beforeend`);
render(siteMainNode, createBoardTemplate(), `beforeend`);

const siteBoardNode = siteMainNode.querySelector(`.board`);
const siteTasksBoardNode = siteBoardNode.querySelector(`.board__tasks`);

render(siteBoardNode, createSortTemplate(), `afterbegin`);
render(siteBoardNode, createLoadMoreBtnTemplate(), `beforeend`);
for (let i = 0; i < TASKS_COUNT; i++) {
  render(siteTasksBoardNode, createTaskTemplate(), `afterbegin`);
}
render(siteTasksBoardNode, createTaskEditTemplate(), `afterbegin`);
