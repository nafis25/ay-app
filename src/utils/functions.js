import moment from 'moment';

export const apostrophize = name => {
  if (isEmpty(name)) return '';

  if (name.substr(-1) === 's') {
    return name + "'";
  } else {
    return name + "'s";
  }
};

const ordinalFormatter = dt =>
  dt.getDate() +
  (dt.getDate() % 10 == 1 && dt.getDate() != 11
    ? 'st'
    : dt.getDate() % 10 == 2 && dt.getDate() != 12
    ? 'nd'
    : dt.getDate() % 10 == 3 && dt.getDate() != 13
    ? 'rd'
    : 'th');

export const globalDateFormatter = (date, type) => {
  try {
    let formattedDate;
    let dateObject = new Date(date);

    switch (type) {
      case 'general':
        formattedDate = dateObject.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'numeric',
          year: '2-digit',
        });
        break;
      case 'session':
        let longMonth = dateObject.toLocaleDateString('en-GB', {
          month: 'long',
        });
        let shortYear = dateObject.toLocaleDateString('en-GB', {
          year: '2-digit',
        });
        formattedDate = `${longMonth} '${shortYear}`;
        break;
      case 'long':
        let day = ordinalFormatter(dateObject);

        let monthAndYear = dateObject.toLocaleDateString('en-GB', {
          month: 'long',
          year: 'numeric',
        });
        formattedDate = `${day} ${monthAndYear}`;
        break;
    }
    return formattedDate;
  } catch (err) {
    console.log(err);
    return 'Invalid Date';
  }
};

export const recencyDateFormatter = (startDate, type) => {
  let date = moment(startDate);

  if (type === 'nooty') return date.fromNow();

  if (moment().diff(date, 'days') >= 1) {
    return date.format('DD/MM/YYYY'); // '2 days ago' etc.
  }
  return date.calendar().split(' ')[0].toLocaleLowerCase(); // 'Yesterday', 'Today', 'Tomorrow'
};

export const amountConverter = (amount, to) => {
  if (to === 'USD') return parseFloat(amount / 84.5).toFixed(2);
  if (to === 'BDT')
    return parseFloat(Math.floor(amount * 84.5)).toLocaleString();
  return parseFloat(amount).toLocaleString();
};

export const isFacebookApp = () => {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1;
};

export const areNumbersEqual = (number_one, number_two) =>
  number_one == number_two;

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const lastElement = list => list[list.length - 1];

export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

export const startCase = words =>
  String(words).split(' ').map(capitalize).join(' ');

export const firstElement = list => list[0];

export const firstName = name => String(name).split(' ')[0];

export const isUndefined = value => typeof value === 'undefined';

export const findItem = (list, callback) => {
  const objFound = list.find(callback);
  if (objFound) return objFound;
  return {};
};
