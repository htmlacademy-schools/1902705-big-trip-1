import SiteInfoView from './view/site-info-view';
import SiteMenuView from './view/site-menu-view';
import FiltersView from './view/filters-view';
import { render, renderPosition } from './utils/render';
import { generatePoint } from './mock/point';
import TripPresenter from './presenter/Trip-presenter';
import PointsModel from './model/points-model';


const POINT_COUNT = 15;
const points = Array.from({ length: POINT_COUNT }, generatePoint);

const tripBody = document.querySelector('.page-body');
const headerMenu = tripBody.querySelector('.trip-main');
const siteMenuElement = tripBody.querySelector('.trip-controls__navigation');
const filtersElement = tripBody.querySelector('.trip-controls__filters');
const mainContainer = tripBody.querySelector('.trip-events');
const pointsModel = new PointsModel();
pointsModel.points = points;


const tripPresenter = new TripPresenter(mainContainer, pointsModel);

if (points.length !== 0) {
  render(headerMenu, new SiteInfoView(points[0]).element, renderPosition.AFTERBEGIN);
}

render(siteMenuElement, new SiteMenuView(), renderPosition.BEFOREEND);
render(filtersElement, new FiltersView(), renderPosition.BEFOREEND);


tripPresenter.init();
