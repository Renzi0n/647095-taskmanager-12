import MenuView from './view/menu.js';
import BoardView from './view/board.js';
import SortView from './view/sort.js';
import LoadMoreBtnView from './view/loadMoreBtn.js';
import FilterView from './view/filter.js';
import TaskView from './view/task.js';
import TaskEditView from './view/taskEdit.js';
import NoTaskView from './view/noTask.js';
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


const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();

  const siteTasksBoardNode = boardComponent.getElement().querySelector(`.board__tasks`);

  let renderTemplateedTaskCount = TASKS_COUNT_PER_STEP;

  render(boardContainer, boardComponent.getElement(), RENDER_POSITION.beforeend);

  if (tasksData.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskView().getElement(), RENDER_POSITION.afterbegin);
    return;
  }

  render(boardComponent.getElement(), new SortView().getElement(), RENDER_POSITION.afterbegin);

  boardTasks
    .slice(0, Math.min(boardTasks.length, TASKS_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(siteTasksBoardNode, boardTask));

  if (boardTasks.length > TASKS_COUNT_PER_STEP) {

    const loadMoreBtnComponent = new LoadMoreBtnView();

    render(boardComponent.getElement(), loadMoreBtnComponent.getElement(), RENDER_POSITION.beforeend);

    loadMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
        .slice(renderTemplateedTaskCount, renderTemplateedTaskCount + TASKS_COUNT_PER_STEP)
        .forEach((task) => renderTask(siteTasksBoardNode, task));

      renderTemplateedTaskCount += TASKS_COUNT_PER_STEP;

      if (renderTemplateedTaskCount >= boardTasks.length) {
        loadMoreBtnComponent.getElement().remove();
      }
    });
  }
};

const siteMainNode = document.querySelector(`.main`);
const siteHeaderNode = siteMainNode.querySelector(`.main__control`);

render(siteHeaderNode, new MenuView().getElement(), RENDER_POSITION.beforeend);
render(siteMainNode, new FilterView(filtersData).getElement(), RENDER_POSITION.beforeend);

renderBoard(document.querySelector(`main`), tasksData);


