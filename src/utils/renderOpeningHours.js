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
  const fullWeekOpeningHours = _.reduce(fullWeek, (finalResult, openingHours, weekday) => {
    const weekdayStart = `${_.upperFirst(weekday)}: `;

    finalResult.text += finalResult.hasClosing ? weekdayStart : '';

    const openingHoursForOneDay = _.reduce(openingHours, (result, openingHour, index) => {
      if (openingHour.type === 'open') {
        result.hasClosing = false;
        result.result += index > 1 ? ', ' : '';
        result.result += secondsTo12HourClock(openingHour.value);
      } else {
        result.result += ` - ${secondsTo12HourClock(openingHour.value)}${index === 0 ? '\n' : ''}`;
        result.result += index === 0 && !result.hasClosing ? weekdayStart : '';
        result.hasClosing = true;
      }
      return result;
    }, {result: ''});

    const hasClosing = !_.size(openingHours) || openingHoursForOneDay.hasClosing;

    finalResult.text += !_.size(openingHours) ? 'Closed' : `${openingHoursForOneDay.result}`;
    finalResult.text += hasClosing ? '\n' : '';

    return _.assign({}, finalResult, {hasClosing});
  }, {text: '', hasClosing: true});

  return fullWeekOpeningHours.text.trim();
}