import AbstractView from './abstract.js';

const createLoadMoreBtnTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreBtn extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createLoadMoreBtnTemplate();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
