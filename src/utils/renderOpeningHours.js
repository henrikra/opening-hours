import _ from 'lodash';

import { secondsTo12HourClock } from './time';

export function renderOpeningHours(weekday, openingHours) {
  const openingHoursFromEarliestToLatest = _.sortBy(openingHours, ['value']);

  let finalInput = '';
  _.each(openingHoursFromEarliestToLatest, (openingHour) => {
    const humanReadableTime = secondsTo12HourClock(openingHour.value);
    finalInput += openingHour.type === 'open' ? `${humanReadableTime} - ` : humanReadableTime;
  });

  return `${_.upperFirst(weekday)}: ${!_.size(openingHours) ? 'Closed' : finalInput}`;
}

export function openingHoursForWeek(openingHoursFullWeek) {
  return _.map(openingHoursFullWeek, (openingHours, weekday) =>
    renderOpeningHours(weekday, openingHours)
  );
}