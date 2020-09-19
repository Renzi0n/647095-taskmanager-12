import MenuView from './view/menu.js';
import FilterPresenter from "./presenter/filter.js";
import BoardPresenter from "./presenter/board.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {generateTask} from "./mock/task.js";
import {render, RenderPosition} from "./utils/render.js";


const TASKS_COUNT = 22;


const tasksData = new Array(TASKS_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasksData);

const filterModel = new FilterModel();


const siteMainNode = document.querySelector(`.main`);
const siteHeaderNode = siteMainNode.querySelector(`.main__control`);


const boardPresenter = new BoardPresenter(siteMainNode, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainNode, filterModel, tasksModel);


render(siteHeaderNode, new MenuView(), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();


