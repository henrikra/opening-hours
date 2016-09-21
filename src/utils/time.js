import _ from 'lodash';

export function secondsTo12HourClock(seconds) {
  const middayStarts = seconds >= 43200;
  const period = middayStarts ? 'pm' : 'am';
  
  const fullHours = _.floor(seconds / 3600);
  let leftOverSeconds = seconds % 3600;
  
  let fullMinutes;
  if (leftOverSeconds) {
    fullMinutes = _.floor(leftOverSeconds / 60);
    leftOverSeconds = leftOverSeconds % 60;
  }

  let finalOutput = '';

  finalOutput += fullHours > 12 ? fullHours - 12 : fullHours;
  if (_.isNumber(fullMinutes)) {
    finalOutput += `.${fullMinutes < 10 ? '0' : ''}${fullMinutes}`;
  }
  if (leftOverSeconds) {
    finalOutput += `:${leftOverSeconds < 10 ? '0' : ''}${leftOverSeconds}`;
  }

  return `${finalOutput} ${period}`;
}