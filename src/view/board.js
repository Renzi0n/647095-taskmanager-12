import AbstractView from './abstract.js';

const createBoardTemplate = () => {
  return (
    `<section class="board container">
      <div class="board__tasks"></div>
    </section>`
  );
};

export default class Board extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
