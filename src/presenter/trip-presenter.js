import SortView from '../view/sort-view';
import PointsListView from '../view/points-list-view';
import EmptyPointsList from '../view/empty-points-list-view';
import { render, renderPosition, remove } from '../utils/render';
import { filters } from '../utils/filter';
import PointPresenter from './point-presenter';
import SiteInfoView from '../view/site-info-view';
import FiltersView from '../view/filters-view';
import NewPointPresenter from './new-point-presenter';
import { generatePoint } from '../mock/point';
import { UpdateAction, UpdateType, FilterType } from '../utils/const';
import {sortTaskByDay, sortTaskByDuration, sortTaskByPrice, SortType} from '../utils/sorting';


export default class TripPresenter {
  #tripContainer = null;
  #headerMenuContainer = null;
  #currentFilter = FilterType.EVERYTHING;
  #sortComponent = null;
  #pointModel = null;
  #filterModel = null;
  #filterContainer = null;
  #filterComponent = null;
  #newPointPresenter = null;
  #currentSortType = null;
  #headerInfoComponent = null;

  #noPointsComponent = new EmptyPointsList(this.#currentFilter);
  #pointListComponent = new PointsListView();
  #pointPresenter = new Map();

  constructor(tripContainer, pointsModel, headerMenu, filterModel, filterContainer) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointsModel;
    this.#filterContainer = filterContainer;
    this.#headerMenuContainer = headerMenu;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter(this.#pointListComponent,  this.#handleViewAction, this.#pointPresenter);
  }


  init = () => {
    render(this.#tripContainer, this.#pointListComponent, renderPosition.BEFOREEND);
    this.#renderBoard(true, true);

    this.#pointModel.addObserver(this.#handleModeEvent);
  }

  get points(){
    const filterType = this.#currentFilter;

    const filteredPoints = filters[filterType](this.#pointModel.points);
    switch(this.#currentSortType){
      case SortType.SORT_DAY:
        return filteredPoints.sort(sortTaskByDay);
      case SortType.SORT_TIME:
        return filteredPoints.sort(sortTaskByDuration);
      case SortType.SORT_PRICE:
        return filteredPoints.sort(sortTaskByPrice);
    }
    return filteredPoints;
  }

  #handleViewAction = (actionType, updateType, update) =>{
    switch(actionType){
      case UpdateAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UpdateAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UpdateAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModeEvent = (updateType, data = null) => {
    switch(updateType){
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard(true, true);
        this.#renderBoard(false, true);
        break;
    }
  }


  #renderHeaderInfo = () => {
    if (this.points.length !== 0) {
      this.#headerInfoComponent = new SiteInfoView(this.points[0]).element;
      render(this.#headerMenuContainer, this.#headerInfoComponent, renderPosition.AFTERBEGIN);
    }
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handleViewAction);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#handleModeEvent(UpdateType.MINOR);
  }

  #renderNoPoints = () => {
    this.#noPointsComponent = new EmptyPointsList(this.#currentFilter);
    render(this.#tripContainer, this.#noPointsComponent, renderPosition.BEFOREEND);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard = (isFirstRendering = false, isMajor = false) => {
    if(this.#currentSortType === null){
      this.#currentSortType = SortType.SORT_DAY;
    }
    if(this.#currentFilter === null){
      this.#currentFilter = FilterType.EVERYTHING;
    }
    if(isFirstRendering){
      this.#renderHeaderInfo();
    }
    if(this.points.length === 0){
      this.#renderNoPoints();
    }
    if(isMajor){
      this.#renderFilter();
    }
    this.#renderSort();
    this.#renderPoints(this.points);
  }


  #clearBoard = ({resetSortType = false} = {}, isMajor = false) => {
    if(resetSortType){
      this.#currentSortType = SortType.SORT_DAY;
    }
    this.#pointPresenter.forEach((presenter) =>
      presenter.destroy()
    );
    if(isMajor){
      remove(this.#filterComponent);
      this.#filterComponent = null;
    }
    this.#headerInfoComponent = null;
    remove(this.#noPointsComponent);
    remove(this.#sortComponent);
  }

  #renderFilter = () =>{
    this.#filterComponent = new FiltersView(this.#currentFilter, this.#newPointPresenter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterChange);
    render(this.#filterContainer, this.#filterComponent, renderPosition.BEFOREEND);
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortChangeClickHandler(this.#handleSortTypeChange);
    render(this.#tripContainer, this.#sortComponent, renderPosition.AFTERBEGIN);
  }

  #handleFilterChange = (filterType) =>{
    if(this.#currentFilter === filterType){
      return;
    }
    this.#currentFilter = filterType;
    this.#handleModeEvent(UpdateType.MINOR);
  }

  createPoint = () => {
    this.#newPointPresenter.isFilterDisabled = true;
    this.#currentSortType = null;
    this.#currentFilter = null;
    this.#handleModeEvent(UpdateType.MAJOR);

    const point = generatePoint();
    this.#newPointPresenter.init(point);
  }
}
