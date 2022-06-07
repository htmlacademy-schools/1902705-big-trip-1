import dayjs from 'dayjs';

export const SortType = {
  SORT_DAY: 'sort-day',
  SORT_TIME: 'sort-time',
  SORT_PRICE: 'sort-price'
};

export const sortTaskByDay = (taskA, taskB) => dayjs(taskA.dateStartEvent).diff(dayjs(taskB.dateStartEvent));

export const sortTaskByDuration = (taskA, taskB) => {
  const durationPointA = dayjs(taskA.dateEndEvent).diff(dayjs(taskA.dateStartEvent));
  const durationPointB = dayjs(taskB.dateEndEvent).diff(dayjs(taskB.dateStartEvent));

  if (durationPointB - durationPointA !== 0) {
    return durationPointB - durationPointA;
  } else {
    return dayjs(taskA.dateStartEvent).diff(dayjs(taskB.dateStartEvent));
  }
};

export const sortTaskByPrice = (taskA, taskB) => {
  if (taskB.price - taskA.price !== 0) {
    return taskB.price - taskA.price;
  } else {
    return dayjs(taskA.dateStartEvent).diff(dayjs(taskB.dateStartEvent));
  }
};
