import dayjs from 'dayjs';
import AbstractView from './abstract-view';

const createWaypointTemplate = (waypoint) => {
  const {waypointType, city, price, isFavorite, startDate, endDate, duration, offers} = waypoint;
  const favoriteClass = isFavorite ? ' event__favorite-btn--active' : '';
  const startDay = dayjs(startDate).format('MMM D');
  const beginDate = dayjs(startDate).format('YYYY-MM-DD');
  const startTime = dayjs(startDate).format('HH:mm');
  const startDatetime = dayjs(startDate).format('YYYY-MM-DDTHH:mm');
  const endTime = dayjs(endDate).format('HH:mm');
  const endDatetime = dayjs(endDate).format('YYYY-MM-DDTHH:mm');
  const createOfferElement = (offer) => {
    if (offer.isChosen) {
      return `<li class="event__offer">
                    <span class="event__offer-title">${offer.name}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`;
    }
  };
  const offerElements = offers.map(createOfferElement).join('');
  const convertDuration = () => {
    const days = duration.days ? String(duration.days).padStart(2, '0') : 0;
    const hours = duration.hours ? String(duration.hours).padStart(2, '0') : 0;
    const mins = duration.minutes ? String(duration.minutes).padStart(2, '0') : 0;
    if (days){
      return `${days}D ${hours}H ${mins}M`;
    }
    else if (hours){
      return `${hours}H ${mins}M`;
    }
    return `${mins}M`;
  };
  const convertedDuration = convertDuration();

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${beginDate}">${startDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${waypointType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${waypointType} ${city}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDatetime}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDatetime}">${endTime}</time>
                  </p>
                  <p class="event__duration">${convertedDuration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">${offerElements}</ul>
                <button class="event__favorite-btn${favoriteClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
   </li>`;
};

export default class WaypointView extends AbstractView{
  #waypoint = null;

  constructor(waypoint) {
    super();
    this.#waypoint = waypoint;
  }

  get template() {
    return createWaypointTemplate(this.#waypoint);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }
}
