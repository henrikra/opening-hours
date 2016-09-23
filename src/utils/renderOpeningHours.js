import _ from 'lodash';

import { secondsTo12HourClock } from './time';

export function renderOpeningHours(weekday, openingHours) {
  const openingHoursFromEarliestToLatest = _.sortBy(openingHours, ['value']);

  let finalInput = '';
  _.each(openingHoursFromEarliestToLatest, (openingHour, index) => {
    const humanReadableTime = secondsTo12HourClock(openingHour.value);
    const separator = openingHour.type === 'open' && index > 0 ? ', ' : '';
    finalInput += openingHour.type === 'open' ? `${separator}${humanReadableTime} - ` : humanReadableTime;
  });
  
  return `${_.upperFirst(weekday)}: ${!_.size(openingHours) ? 'Closed' : finalInput}`;
}

export function openingHoursForWeek(openingHoursFullWeek) {
  return _.map(openingHoursFullWeek, (openingHours, weekday) =>
    renderOpeningHours(weekday, openingHours)
  );
}

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export function simpleOpeningHours(fullWeek) {
  const fullWeekOpeningHours = _.reduce(fullWeek, (allOpeningHours, openingHours, weekday) => {
    const weekdayUppered = _.upperFirst(weekday);

    if (!_.size(openingHours)) {
      allOpeningHours[weekdayUppered] = 'Closed';
    } else {
      const openingHoursForOneDay = _.reduce(openingHours, (result, openingHour, index) => {
        const formattedTime = secondsTo12HourClock(openingHour.value);
        if (openingHour.type === 'open') {
          result += index > 1 ? ', ' : '';
          result += formattedTime;
        } else {
          if (index === 0) {
            const previousDay = _.indexOf(weekdays, weekdayUppered) - 1;
            allOpeningHours[_.nth(weekdays, previousDay)] += ` - ${formattedTime}`;
          } else {
            result += ` - ${formattedTime}`;
          }
        }
        return result;
      }, '');

      allOpeningHours[weekdayUppered] = openingHoursForOneDay;
    }

    return allOpeningHours;
  }, {});

  return fullWeekOpeningHours;
}