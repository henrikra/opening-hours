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

export function simpleOpeningHours(fullWeek) {
  let finalInput = '';
  let hasClosing = true;

  _.each(fullWeek, (openingHours, weekday) => {
    finalInput += hasClosing ? `${_.upperFirst(weekday)}: ` : '';

    if (!_.size(openingHours)) {
      finalInput += 'Closed\n';
      return finalInput;
    }

    _.each(openingHours, (openingHour, index) => {
      const hasComma = openingHour.type === 'open' && index > 1;
      const hasDash = openingHour.type === 'close';


      finalInput += !hasClosing && index === 0 && openingHour.type === 'close' 
        ? `${hasDash ? ' - ' : ''}${secondsTo12HourClock(openingHour.value)}\n${_.upperFirst(weekday)}: `
        : `${hasComma ? ', ' : ''}${hasDash ? ' - ' : ''}${secondsTo12HourClock(openingHour.value)}`;
      hasClosing = openingHour.type === 'close';
    });

    finalInput += hasClosing ? '\n' : '';

  });

  return finalInput.slice(0, -1);
}