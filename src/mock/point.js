import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common';

export const isEqualCities = (inputValue) =>{
  const cities = [
    'Amsterdam',
    'Geneva',
    'Moscow',
    'Yekaterinburg',
    'Bangkok',
    'Baku'
  ];
  return cities.some((city) => city === inputValue);
};

const createOffer = (cost, name) => ({price: cost, description : name});

export const servises = {
  'taxi' : [createOffer(30, 'Add luggage'),
    createOffer(100, 'Switch to comfort class')],
  'bus' : [createOffer(20, 'Add luggage'), createOffer(10, 'Add meal'), createOffer(100, 'Switch to comfort class')],
  'train':[createOffer(25, 'Add luggage'), createOffer(15, 'Add a bed'), createOffer(15, 'Choose seats')],
  'ship':[createOffer(25, 'Add luggage'), createOffer(15, 'Add a bed'), createOffer(100, 'Switch to comfort class')],
  'drive':[createOffer(25, 'Add luggage'), createOffer(15, 'Add meal'), createOffer(100, 'Switch to comfort class')],
  'flight': [createOffer(30, 'Add luggage'), createOffer(15, 'Choose seats'), createOffer(100, 'Switch to comfort class')],
  'check-in': [createOffer(30, ' Smoking room'), createOffer(100, ' VIP hall')],
  'sightseeing': [createOffer(50, 'guide'), createOffer(100, 'Rent a car')],
  'restaurant' : [createOffer(30, ' Smoking room'), createOffer(100, ' VIP hall')]
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateDescription = () => {
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
  const numberProposals = getRandomInteger(1,5);
  let description = '';

  for (let i = 0; i < numberProposals; i++){
    description += texts[getRandomInteger(0, texts.length - 1)];
  }
  return description;
};

const generatePointType = () => {
  const pointTypes = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant'
  ];
  const randomInt = getRandomInteger(0, pointTypes.length - 1);
  return pointTypes[randomInt];
};

const generateDestinationCity = () => {
  const cities = [
    'Amsterdam',
    'Geneva',
    'Moscow',
    'Yekaterinburg',
    'Bangkok',
    'Baku'
  ];

  return cities[getRandomIntInclusive(0, cities.length - 1)];
};

const generateOffers = () => {
  const offers = [];
  for (let i = 0; i < getRandomIntInclusive(0, 5); i++) {
    offers.push({ id: i, title: 'example title', price: getRandomInteger(10, 100) });
  }
  return offers;
};

export const generatePictures = () => {
  const picturesSrc = [];
  for (let i = 0; i <= 4; i++) {
    picturesSrc.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return picturesSrc;
};

export const generateDates = () => {
  const maxGap = 7;
  const startDate = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const endDate = startDate
    .clone()
    .add(getRandomInteger(0, maxGap), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
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

export const generatePoint = () => {
  const pointType = generatePointType();
  const dates = generateDates();
  return {
    pointType,
    id: nanoid(),
    price: getRandomIntInclusive(5, 200),
    destination: generateDestinationCity(),
    offer: {
      type: pointType,
      offers: generateOffers(),
    },
    destinationInfo: {
      description: generateDescription(),
      pictures: generatePictures()
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
    duration: countDuration(dates.start, dates.end),
    offersForm : servises[pointType],
    dateStartEvent: dates.start,
    dateEndEvent: dates.end
  };
};


