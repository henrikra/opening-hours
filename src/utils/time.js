import _ from 'lodash';

function formatHours(hours) {
  return hours > 12 ? hours - 12 : hours;
}

function formatMinutes(minutes, seconds) {
  if (minutes || seconds) {
    return `.${minutes < 10 ? '0' : ''}${minutes}`;
  }
  return '';
}

function formatSeconds(seconds) {
  if (seconds) {
    return `:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  return '';
}

export function secondsTo12HourClock(totalSeconds) {
  const hours = _.floor(totalSeconds / 3600);
  const minutes = _.floor((totalSeconds - hours * 3600) / 60);
  const seconds = _.floor(totalSeconds % 60);

  const finalHours = formatHours(hours);
  const finalMinutes = formatMinutes(minutes, seconds);
  const finalSeconds = formatSeconds(seconds);
  const period = totalSeconds >= 43200 ? 'pm' : 'am';
  
  return `${finalHours}${finalMinutes}${finalSeconds} ${period}`;
}