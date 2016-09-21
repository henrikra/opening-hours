import { expect } from 'chai';

import { secondsTo12HourClock } from '../../src/utils/time';

describe('secondsTo12HourClock', () => {
  it('returns only hours when even hours', () => {
    expect(secondsTo12HourClock(32400)).to.equal('9 am');
  });

  it('returns hours and minutes when even minutes', () => {
    expect(secondsTo12HourClock(37800)).to.equal('10.30 am');
  });

  it('return hours, minutes and seconds on uneven minutes', () => {
    expect(secondsTo12HourClock(37801)).to.equal('10.30:01 am');
  });

  it('formats minimum value', () => {
    expect(secondsTo12HourClock(0)).to.equal('0 am');
  });

  it('formats one second', () => {
    expect(secondsTo12HourClock(1)).to.equal('0.00:01 am');
  });

  it('formats maximum value', () => {
    expect(secondsTo12HourClock(86399)).to.equal('11.59:59 pm');
  });

  it('formats when midday starts', () => {
    expect(secondsTo12HourClock(43200)).to.equal('12 pm');
  });
});