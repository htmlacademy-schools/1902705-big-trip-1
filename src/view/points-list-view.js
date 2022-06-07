import AbstractView from './abstract-view.js';

const createPointsListTemplate = () => '<div class="trip-events__list"></div>';

export default class PointsListView extends AbstractView {
  get template() {
    return createPointsListTemplate();
  }
}
