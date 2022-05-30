import dayjs from 'dayjs';
import SmartView from './smart-view';
import {createFormOffersTemplate} from '../utils/offers-utils';

const createEditFormTemplate = (waypoint) => {
  const {waypointType, price, city, startDate, endDate, offers, cityDescription, id} = waypoint;

  const beginDate = dayjs(startDate).format('DD/MM/YY HH:mm');
  const endDatetime = dayjs(endDate).format('DD/MM/YY HH:mm');

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${waypointType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${waypointType === 'taxi' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${waypointType === 'bus' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${waypointType === 'train' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${waypointType === 'ship' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${waypointType === 'drive' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${waypointType === 'flight' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${waypointType === 'check-in' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${waypointType === 'sightseeing' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${waypointType === 'restaurant' ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${waypointType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${beginDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDatetime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${createFormOffersTemplate(offers, waypointType)}

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${cityDescription}</p>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class EditFormView extends SmartView{
  constructor(waypoint) {
    super();
    this._waypoint = waypoint;
  }

  get template(){
    return createEditFormTemplate(this._waypoint);
  }


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._waypoint);
  }

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({ type: evt.target.value });
  }

  #changeCityHandler = (evt) => {
    evt.preventDefault();
    this.updateData({ destination: { ...this._waypoint.destination, ...{ name: evt.target.value } } });
  }

  #changeOptionsHandler = (evt) => {
    evt.preventDefault();
    const splited = evt.target.id.split('-');
    const index = +splited[splited.length - 1] - 1;
    const offers = JSON.parse(JSON.stringify(this._waypoint.offers));

    for (const offerStruct of offers) {
      if (offerStruct.type !== this._waypoint.type) {continue;}

      const e = offerStruct.offers[index];
      e.isActive = !e.isActive;
      break;
    }

    this.updateData({ offers });
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('input', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeCityHandler);

    const offers = this.element.querySelector('.event__available-offers');
    if (offers)
    {offers.addEventListener('input', this.#changeOptionsHandler);}
  }

  reset = (waypoint) => {
    this.updateData(waypoint);
  }
}
