import _ from 'lodash';

import { secondsTo12HourClock } from './time';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export function getOpeningHours(fullWeek) {
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