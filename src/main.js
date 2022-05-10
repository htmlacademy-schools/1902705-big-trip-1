import {render, RenderPosition} from './utils/render';
import SiteInfoView from './view/site-info-view';
import SiteMenuView from './view/site-menu-view';
import FiltersView from './view/filters-view';
import {generateWaypoint} from './mock/waypoint';
import TripPresenter from './presenter/trip-presenter';

const waypointCount = 15;
const waypointsArray = Array.from({length: waypointCount}, generateWaypoint);
const pageMainElement = document.querySelector('.page-body');

const tripNavigationElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

render(tripNavigationElement, new SiteMenuView(),RenderPosition.BEFOREEND);
render(tripFiltersElement, new FiltersView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageMainElement);
tripPresenter.init(waypointsArray);
if (waypointsArray.length !== 0){
  render(tripNavigationElement, new SiteInfoView(waypointsArray), RenderPosition.BEFOREBEGIN);
}
