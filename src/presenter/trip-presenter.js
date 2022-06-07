import SortView from '../view/sort-view';
import PointsListView from '../view/points-list-view';
import EmptyPointsList from '../view/empty-points-list-view';
import { render, renderPosition } from '../utils/render.js';
import PointPresenter from './Point-presenter';


import { SortType, sortTaskByDay, sortTaskByDuration, sortTaskByPrice} from '../utils/sorting';
import {updateItem} from '../utils/common';


export default class TripPresenter {
  #tripContainer = null;

  #noPointsComponent = new EmptyPointsList();
  #sortComponent = new SortView();
  #pointListComponent = new PointsListView();

  #boardPoints = [];
  #pointPresenter = new Map();
  #sourceBoardPoints = [];
  #currentSortType = null;

  constructor(tripContainer) {
    this.#tripContainer = tripContainer;
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
    this.#sourceBoardPoints = [...boardPoints];

    render(this.#tripContainer, this.#pointListComponent, renderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((element) => element.resetView());
  }

  #handlePointChange = (updatePoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.SORT_DAY:
        this.#boardPoints.sort(sortTaskByDay);
        break;
      case SortType.SORT_TIME:
        this.#boardPoints.sort(sortTaskByDuration);
        break;
      case SortType.SORT_PRICE:
        this.#boardPoints.sort(sortTaskByPrice);
        break;
      default:
        this.#boardPoints = [...this.#sourceBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#boardPoints
      .forEach((boardPoint) => this.#renderPoint(boardPoint));
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, renderPosition.AFTERBEGIN);
    this.#sortComponent.setSortChangeClickHandler(this.#handleSortTypeChange);
  }


  #renderNoPoints = () => {
    render(this.#tripContainer, this.#noPointsComponent, renderPosition.BEFOREEND);
  }

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPoints();
  }
}
