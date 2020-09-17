import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import BoardPresenter from "./presenter/board.js";
import TasksModel from "./model/tasks.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";


const TASKS_COUNT = 22;


const tasksData = new Array(TASKS_COUNT).fill().map(generateTask);
const filtersData = generateFilter(tasksData);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasksData);


const siteMainNode = document.querySelector(`.main`);
const siteHeaderNode = siteMainNode.querySelector(`.main__control`);


const boardPresenter = new BoardPresenter(siteMainNode, tasksModel);


render(siteHeaderNode, new MenuView(), RenderPosition.BEFOREEND);
render(siteMainNode, new FilterView(filtersData), RenderPosition.BEFOREEND);

boardPresenter.init(tasksData);


