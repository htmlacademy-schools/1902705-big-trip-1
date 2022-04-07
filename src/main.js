import {render, RenderPosition} from './render';
import SiteInfoView from './view/site-info-view';
import SiteMenuView from './view/site-menu-view';
import FiltersView from './view/filters-view';
import SortView from './view/sort-view';
import EditFormView from './view/edit-form-view';
import WaypointView from './view/waypoint-view';
import EventListView from './view/event-list-view';
import {generateWaypoint} from './mock/waypoint';
import EmptyWaypointsListView from './view/empty-waypoints-list-view';

const waypointCount = 15;
const waypointsArray = Array.from({length: waypointCount}, generateWaypoint);

const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const renderWaypoint = (eventListElement, waypoint) => {
  const waypointComponent = new WaypointView(waypoint);
  const waypointEditComponent = new EditFormView(waypoint);

  const replaceWaypointToEdit = () => {
    eventListElement.replaceChild(waypointEditComponent.element, waypointComponent.element);
  };

  const replaceEditToWaypoint = () => {
    eventListElement.replaceChild(waypointComponent.element, waypointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToWaypoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  waypointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceWaypointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  waypointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditToWaypoint();
  });

  waypointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToWaypoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });


  render(eventListElement, waypointComponent.element, RenderPosition.BEFOREEND);
};

if (waypointsArray.length === 0) {
  render(tripNavigationElement, new SiteMenuView().element,RenderPosition.BEFOREEND);
  render(tripFiltersElement, new FiltersView().element, RenderPosition.BEFOREEND);
  render(tripEventsElement, new EmptyWaypointsListView().element, RenderPosition.BEFOREEND);
}
else {
  const eventListComponent = new EventListView();
  render(tripEventsElement, eventListComponent.element, RenderPosition.BEFOREEND);

  const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');
  render(tripMainElement, new SiteInfoView(waypointsArray).element, RenderPosition.AFTERBEGIN);
  render(tripNavigationElement, new SiteMenuView().element,RenderPosition.BEFOREEND);
  render(tripFiltersElement, new FiltersView().element, RenderPosition.BEFOREEND);
  render(tripEventsListElement, new SortView().element, RenderPosition.AFTERBEGIN);
  for (let i = 0; i < waypointCount; i++){
    renderWaypoint(eventListComponent.element, waypointsArray[i]);
  }
}
