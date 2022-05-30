import WaypointView from '../view/waypoint-view';
import EditFormView from '../view/edit-form-view';
import {render, RenderPosition, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #waypointsListElement = null;
  #changeData = null;
  #changeMode = null;

  #waypointItemComponent = null;
  #editFormComponent = null;

  #waypoint = null;
  #mode = Mode.DEFAULT;

  constructor(waypointsListElement, changeData, changeMode) {
    this.#waypointsListElement = waypointsListElement;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (waypoint) => {
    this.#waypoint = waypoint;

    const prevWaypointComponent = this.#waypointItemComponent;
    const prevEditComponent = this.#editFormComponent;

    this.#waypointItemComponent = new WaypointView(waypoint);
    this.#editFormComponent = new EditFormView(waypoint);

    this.#waypointItemComponent.setEditClickHandler(this.#handleEditClick);
    // this.#editFormComponent.setRollupClickHandler(this.#handleRollupClick);
    // this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#waypointItemComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#editFormComponent.restoreHandlers = () => {
      this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
      this.#editFormComponent.setRollupClickHandler(this.#handleRollupClick);
      this.#editFormComponent.setInnerHandlers();
    };
    this.#editFormComponent.restoreHandlers();

    if (prevWaypointComponent === null || prevEditComponent === null){
      render(this.#waypointsListElement, this.#waypointItemComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this.#mode === Mode.DEFAULT){
      replace(this.#waypointItemComponent, prevWaypointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditComponent);
    }

    remove(prevWaypointComponent);
    remove(prevEditComponent);
  }

  destroy = () => {
    remove(this.#waypointItemComponent);
    remove(this.#editFormComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  }

  #replaceItemToForm = () => {
    replace(this.#editFormComponent, this.#waypointItemComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem = () => {
    replace(this.#waypointItemComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceFormToItem();
    }
  };

  #handleEditClick = () => {
    this.#replaceItemToForm();
  };

  #handleRollupClick = () => {
    this.#editFormComponent.reset(this.#waypoint);
    this.#replaceFormToItem();
  };

  #handleFormSubmit = (waypoint) => {
    this.#changeData(waypoint);
    this.#replaceFormToItem();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#waypoint, isFavorite: !this.#waypoint.isFavorite});
  }
}
