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

const generateWaypointType = () => {
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
  const offers = [
    {
      offerType: 'luggage',
      name: 'Add luggage',
      price: 30,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      offerType: 'comfort class',
      name: 'Switch to comfort',
      price: 100,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      offerType: 'meal',
      name: 'Add meal',
      price: 15,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      offerType: 'seats choice',
      name: 'Choose seats',
      price: 5,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      offerType: 'train travel',
      name: 'Travel by train',
      price: 40,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      offerType: 'car',
      name: 'Rent a car',
      price: 200,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      offerType: 'breakfast',
      name: 'Add breakfast',
      price: 40,
      isChosen: Boolean(getRandomInt(0,1))
    },
    {
      offerType: 'lunch',
      name: 'Lunch in city',
      price: 55,
      isChosen: Boolean(getRandomInt(0,1))
    },
  ];
  const numberOfOffers = getRandomInt(0, 5);
  const selectedOffers = [];
  while (selectedOffers.length < numberOfOffers){
    const current = Math.floor(Math.random() * offers.length);
    if (selectedOffers.indexOf(offers[current]) === -1) {
      selectedOffers.push(offers[current]);
    }
  }
  return selectedOffers;
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
