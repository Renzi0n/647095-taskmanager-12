import MenuView from './view/menu.js';
import BoardView from './view/board.js';
import SortView from './view/sort.js';
import LoadMoreBtnView from './view/loadMoreBtn.js';
import FilterView from './view/filter.js';
import TaskView from './view/task.js';
import TaskEditView from './view/taskEdit.js';
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {render, RENDER_POSITION} from "./utils.js";


const TASKS_COUNT = 22;
const TASKS_COUNT_PER_STEP = 8;


const renderTask = (taskElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceCardToForm = () => {
    taskElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceFormToCard = () => {
    taskElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(taskElement, taskComponent.getElement(), RENDER_POSITION.beforeend);
};


const tasksData = new Array(TASKS_COUNT).fill().map(generateTask);
const filtersData = generateFilter(tasksData);


const siteMainNode = document.querySelector(`.main`);

const siteHeaderNode = siteMainNode.querySelector(`.main__control`);

render(siteHeaderNode, new MenuView().getElement(), RENDER_POSITION.beforeend);
render(siteMainNode, new FilterView(filtersData).getElement(), RENDER_POSITION.beforeend);
render(siteMainNode, new BoardView().getElement(), RENDER_POSITION.beforeend);

const siteBoardNode = siteMainNode.querySelector(`.board`);
const siteTasksBoardNode = siteBoardNode.querySelector(`.board__tasks`);

render(siteBoardNode, new SortView().getElement(), RENDER_POSITION.afterbegin);

for (let i = 0; i < Math.min(tasksData.length, TASKS_COUNT_PER_STEP); i++) {
  renderTask(siteTasksBoardNode, tasksData[i]);
}

if (tasksData.length > TASKS_COUNT_PER_STEP) {
  let renderTemplateedTaskCount = TASKS_COUNT_PER_STEP;

  render(siteBoardNode, new LoadMoreBtnView().getElement(), RENDER_POSITION.beforeend);

  const loadMoreButton = siteBoardNode.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasksData
      .slice(renderTemplateedTaskCount, renderTemplateedTaskCount + TASKS_COUNT_PER_STEP)
      .forEach((task) => renderTask(siteTasksBoardNode, task));

    renderTemplateedTaskCount += TASKS_COUNT_PER_STEP;

    if (renderTemplateedTaskCount >= tasksData.length) {
      loadMoreButton.remove();
    }
  });
}
