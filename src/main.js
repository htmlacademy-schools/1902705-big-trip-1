import SiteMenuView from './view/site-menu-view';
import { render, renderPosition} from './utils/render';
import { generatePoint } from './mock/point';
import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/point-model';
import FilterModel from './model/filter-model';

const POINT_COUNT = 5;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripBody = document.querySelector('.page-body');
const headerMenu = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const mainContainer = tripBody.querySelector('.trip-events');

const pointModel = new PointModel();
const filterModel = new FilterModel();

pointModel.points = points;

const tripPresenter = new TripPresenter(mainContainer, pointModel, headerMenu, filterModel, filtersElement);

render(siteMenuElement, new SiteMenuView(), renderPosition.BEFOREEND);
tripPresenter.init(pointModel.points);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

