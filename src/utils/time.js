import {DateTime} from 'luxon';

export const Date = (dateObj, format = 'yyyy', tz = 'local') => {
  if (DateTime) {
    if (dateObj == 'now') {
      return DateTime.fromObject({}, {zone: tz}).toFormat(format);
    } else {
      return DateTime.fromISO(dateObj).toFormat(format);
    }
  } else {
    return dateObj;
  }
};

export const Year = (dateObj) => {
  return Date(dateObj, 'yyyy');
};
