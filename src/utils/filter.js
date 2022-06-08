import { FilterType } from './const';

export const filters = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.dateStartEvent) > new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => new Date(point.dateEndEvent) < new Date()),
};


