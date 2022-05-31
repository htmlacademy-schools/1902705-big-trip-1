import dayjs from 'dayjs';
import {getRandomInt} from '../utils/common';
import {nanoid} from 'nanoid';


const generateDescription = () => {
  const texts = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];
  const numberProposals = getRandomInt(1,5);
  let description = '';

  for (let i = 0; i < numberProposals; i++){
    description += texts[getRandomInt(0, texts.length - 1)];
  }
  return description;
};

const waypointTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const generateWaypointType = () => {
  const randomInt = getRandomInt(0, waypointTypes.length - 1);
  return waypointTypes[randomInt];
};

const generatePhotos = () => {
  const numberOfPhotos = getRandomInt(1, 5);
  const photos = [];
  for (let i = 0; i < numberOfPhotos; i++){
    photos.push(`http://picsum.photos/248/152?r=${getRandomInt(10, 50)}`);
  }
  return photos;
};

const generateCity = () => {
  const cities = [
    'Amsterdam',
    'Geneva',
    'Moscow',
    'Yekaterinburg',
    'Bangkok',
    'Baku'
  ];
  return cities[getRandomInt(0, cities.length - 1)];
};

const generateOffers = () => {
  const result = [];

  for (const type of waypointTypes) {
    const offers = [];
    const titles = [
      'Add luggage',
      'Order Uber',
      'Switch to comfort',
      'Rent a car',
      'Add breakfast',
      'Book tickets',
      'Lunch in city'
    ];

    for (let j = 0; j < getRandomInt(0, 5); j++) {
      const nextTitle = titles[getRandomInt(0, titles.length - 1)];
      offers.push(
        {
          id: j + 1,
          title: nextTitle,
          price: getRandomInt(10, 150),
          isActive: Boolean(getRandomInt(0, 1))
        });
      titles.splice(titles.indexOf(nextTitle), 1);
    }

    result.push({
      type,
      offers
    });
  }

  return result;
};

export const generateDates = () => {
  const maxGap = 7;
  const startDate = dayjs()
    .add(getRandomInt(-maxGap, maxGap), 'day')
    .add(getRandomInt(-maxGap, maxGap), 'hour')
    .add(getRandomInt(-maxGap, maxGap), 'minute');
  const endDate = startDate
    .clone()
    .add(getRandomInt(0, maxGap), 'day')
    .add(getRandomInt(0, 59), 'hour')
    .add(getRandomInt(0, 59), 'minute');
  return {
    start: startDate.toDate(),
    end: endDate.toDate()
  };
};


const countDuration = (start, end) => {
  const duration = new Date(end - start);

  return {
    days: duration.getUTCDate() - 1,
    hours: duration.getUTCHours(),
    minutes: duration.getUTCMinutes(),
  };
};

const generatePrice = () => getRandomInt(15, 150);

export const generateWaypoint = () => {
  const dates = generateDates();

  return {
    id: nanoid(),
    waypointType: generateWaypointType(),
    city: generateCity(),
    offers: generateOffers(),
    cityDescription: generateDescription(),
    photos: generatePhotos(),
    startDate: dates.start,
    endDate: dates.end,
    duration: countDuration(dates.start, dates.end),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInt(0, 1))
  };
};
