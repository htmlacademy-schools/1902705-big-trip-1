import AbstractView from './abstract-view';

const createEmptyWaypointsListTemplate = () => (
  `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`
);

export default class EmptyWaypointsListView extends AbstractView{
  get template() {
    return createEmptyWaypointsListTemplate();
  }
}
