import {renderTemplate} from './render';
import {RenderPosition} from './render';
import {createSiteInfoTemplate} from './view/site-info-view';
import {createSiteMenuTemplate} from './view/site-menu-view';
import {createFiltersTemplate} from './view/filters-view';
import {createSortTemplate} from './view/sort-view';
import {createEditFormTemplate} from './view/edit-form-view';
import {createWaypointTemplate} from './view/waypoint-view';
import {createEventsListTemplate} from './view/event-list-view';
import {generateWaypoint} from './mock/waypoint';

const waypointCount = 15;
const waypointsArray = Array.from({length: waypointCount}, generateWaypoint);

const tripMainElement = document.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderTemplate(tripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(tripMainElement, createSiteInfoTemplate(waypointsArray), RenderPosition.AFTERBEGIN);
renderTemplate(tripNavigationElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersElement, createFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripEventsListElement, createEditFormTemplate(waypointsArray[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < waypointCount; i++){
  renderTemplate(tripEventsListElement, createWaypointTemplate(waypointsArray[i]), RenderPosition.BEFOREEND);
}
