import {render, RenderPosition, replace} from './utils/render';
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
    replace(waypointEditComponent, waypointComponent);
  };

  const replaceEditToWaypoint = () => {
    replace(waypointComponent, waypointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToWaypoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  waypointComponent.setEditClickHandler(() => {
    replaceWaypointToEdit();
    document.addEventListener('keydown', onEscKeyDown);
  });

  waypointEditComponent.setRollupClickHandler(() => {
    replaceEditToWaypoint();
  });

  waypointEditComponent.setFormSubmit(() => {
    replaceEditToWaypoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });


  render(eventListElement, waypointComponent, RenderPosition.BEFOREEND);
};

if (waypointsArray.length === 0) {
  render(tripNavigationElement, new SiteMenuView(),RenderPosition.BEFOREEND);
  render(tripFiltersElement, new FiltersView(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new EmptyWaypointsListView(), RenderPosition.BEFOREEND);
}
else {
  const eventListComponent = new EventListView();
  render(tripEventsElement, eventListComponent, RenderPosition.BEFOREEND);

  const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');
  render(tripMainElement, new SiteInfoView(waypointsArray), RenderPosition.AFTERBEGIN);
  render(tripNavigationElement, new SiteMenuView(),RenderPosition.BEFOREEND);
  render(tripFiltersElement, new FiltersView(), RenderPosition.BEFOREEND);
  render(tripEventsListElement, new SortView(), RenderPosition.AFTERBEGIN);
  for (let i = 0; i < waypointCount; i++){
    renderWaypoint(eventListComponent.element, waypointsArray[i]);
  }
}
